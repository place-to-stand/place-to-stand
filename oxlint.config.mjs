/**
 * Oxlint's config, built from lint/config.mjs (ESLint's flat format) by
 * lint/to-oxlint.mjs. Change rules in lint/config.mjs.
 */
import config from './lint/config.mjs'
import { toOxlint } from './lint/to-oxlint.mjs'

export default toOxlint(config)
