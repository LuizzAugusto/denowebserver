//@ts-check
import { serve } from "./deps/server.js"
import { notFoundResponse } from "./notFoundResponse.js"
import { readFileResponse } from "./readFileResponse.js"

const HOST = "localhost"
const PORT = 3000
const PUBLIC_FOLDER = "./public"

export function createRestServerController({ host = HOST, port = PORT, publicFolder = PUBLIC_FOLDER } = {}) {
  /**
   * 
   * @type {Promise<void>|undefined}
   */
  let _server
  const _abortController = new AbortController() 

  function init() {
    Promise.resolve(console.log(`Starting on http://${host}:${port}`))

    _server = serve(function(req) {
      if (req.method !== "GET")
        return notFoundResponse()

      const url = new URL(req.url)
      const path = url.pathname

      if (path.endsWith(".css"))
        return readFileResponse(`${publicFolder}/${path}`, "text/css")

      if (path.endsWith(".js") || path.endsWith(".mjs"))
        return readFileResponse(`${publicFolder}/${path}`, "text/javascript")

      if (path === "/")
        return readFileResponse(`${publicFolder}/index.html`, "text/html")

      return notFoundResponse()
    }, { hostname: host, port, signal: _abortController.signal })
  }

  async function stop() {
    if (_server) {
      _abortController.abort()
      await _server
    }
  }

  return {
    init
  , stop
  }
}