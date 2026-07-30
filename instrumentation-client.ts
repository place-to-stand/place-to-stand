import { initBotId } from 'botid/client/core'

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
