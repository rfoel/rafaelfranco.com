import { createRequestHandler } from '@remix-run/architect'
import type { ServerBuild } from '@remix-run/node'

const build = require('./build') as ServerBuild

export const handler = createRequestHandler({
  build,
  getLoadContext() {
    return {}
  },
})
