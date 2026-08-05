/**
 * Makes React's DOM teardown survive a page that a translator has rewritten.
 *
 * Chrome's built-in translation (and Google Translate generally) rewraps text
 * nodes in injected `<font>` elements, reparenting nodes React is still
 * tracking. When React later unmounts that subtree it calls
 * `parent.removeChild(node)` against the parent it remembers, the browser sees
 * a different parent, and throws:
 *
 *   NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be
 *   removed is not a child of this node.
 *
 * That is uncatchable by anything downstream: it happens in React's commit
 * phase and takes the whole page with it. It killed a completed audit in
 * production on 2026-08-02 (Android Chrome, es-US, Mexico, paid click) at the
 * exact moment the wizard unmounted to show the results.
 *
 * The two guards below make both mutations tolerant instead of fatal. React
 * only calls `removeChild` on the top-most host nodes of a deleted subtree, so
 * guarding these two methods covers the whole class of failure, anywhere on the
 * site: the audit's stage swap, the capture form's success swap, the header
 * nav, toast dismissal.
 *
 * Cost, stated plainly: this patches a DOM prototype for every script on the
 * page, and on a translated page the resulting node order can end up slightly
 * wrong. A slightly wrong page beats a blank one.
 *
 * Deliberately different from the widely copied workaround in
 * facebook/react#11538, which returns the node without detaching it. That
 * leaves an orphaned translated copy of the old view visible underneath the new
 * one. Detaching from the real parent, and appending rather than dropping, is
 * what keeps the page correct as well as alive.
 */
export function installTranslationSafeDom(): void {
  // No-op during SSR, where there is no DOM to patch.
  if (typeof Node === 'undefined') return

  const proto = Node.prototype as Node & { __ptsTranslationSafe?: boolean }
  if (proto.__ptsTranslationSafe) return
  proto.__ptsTranslationSafe = true

  const nativeRemoveChild = Node.prototype.removeChild
  Node.prototype.removeChild = function removeChild<T extends Node>(
    this: Node,
    child: T
  ): T {
    if (child.parentNode !== this) {
      // Reparented under our feet. Detach it from wherever it actually lives so
      // it does not linger on screen. This re-enters the patched function once,
      // where the parent now matches and the native call runs. One level of
      // recursion, never a loop. A node with no parent at all is already gone,
      // so returning it unchanged is correct.
      child.parentNode?.removeChild(child)
      return child
    }

    return nativeRemoveChild.call(this, child) as T
  }

  const nativeInsertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function insertBefore<T extends Node>(
    this: Node,
    node: T,
    reference: Node | null
  ): T {
    if (reference && reference.parentNode !== this) {
      // The node we were told to insert before has moved. Append instead of
      // throwing: position may be off, but the content still renders.
      return this.appendChild(node)
    }

    return nativeInsertBefore.call(this, node, reference) as T
  }
}
