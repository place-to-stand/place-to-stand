import { initBotId } from 'botid/client/core'
import { installTranslationSafeDom } from '@/src/lib/translation-safe-dom'

/**
 * Runs before the app hydrates, so React never gets the chance to hit a
 * translator-rewritten node with an unguarded `removeChild`. See the module for
 * why this is needed and what it costs.
 */
installTranslationSafeDom()

/**
 * Protect only the routes whose server actions actually call `checkBotId()`.
 *
 * Server actions POST to the URL of the page that invoked them, so these paths
 * cover the contact form (`/contact`) and the audit's lead-capture form
 * (`/audit`). A blanket `path: '/**'` also challenged every audit progress push
 * to `/api/audit-progress`, which adds latency to each one and errors outright
 * in local development, where the challenge cannot be served.
 *
 * If either form is ever rendered on another route, add that route here or its
 * bot protection silently lapses.
 */
initBotId({
  protect: [
    {
      path: '/contact',
      method: 'POST',
      advancedOptions: {
        checkLevel: 'basic',
      },
    },
    {
      path: '/audit',
      method: 'POST',
      advancedOptions: {
        checkLevel: 'basic',
      },
    },
  ],
})
