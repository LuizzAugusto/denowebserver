//@ts-check
const HOST = "localhost"
const PORT = 3007
const USER_AGENT = "Mozilla/5.0 Fake Browser"

export function createFakeBrowser({ host = HOST, port = PORT, userAgent = USER_AGENT } = {}) {
  function requestIndex() {
    return fetch(`http://${host}:${port}`,
      { method: "GET"
      , redirect: "follow"
      , headers: 
        { accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
        , "accept-encoding": "gzip, deflate"
        , "accept-language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3"
        , connection: "keep-alive"
        , host: `${host}:${port}`
        , "sec-fetch-dest": "document"
        , "sec-fetch-mode": "navigate"
        , "sec-fetch-site": "none"
        , "sec-fetch-user": "?1"
        , "upgrade-insecure-requests": "1"
        , "user-agent": userAgent
        }
      })
  }

  /**
   * 
   * @param {string} pathname 
   * @returns 
   */
  function requestJS(pathname) {
    return fetch(`http://${host}:${port}${pathname}`,
      { method: "GET"
      , redirect: "follow"
      , headers: 
        { accept: "*/*"
        , "accept-encoding": "gzip, deflate"
        , "accept-language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3"
        , "cache-control": "max-age=0"
        , connection: "keep-alive"
        , host: `${host}:${port}`
        , referer: `http://${host}:${port}/`
        , "sec-fetch-dest": "script"
        , "sec-fetch-mode": "no-cors"
        , "sec-fetch-site": "same-origin"
        , "user-agent": userAgent
        }
      })
  }

  /**
   * 
   * @param {string} pathname 
   * @returns 
   */
  function requestCSS(pathname) {
    return fetch(`http://${host}:${port}${pathname}`,
      { method: "GET"
      , redirect: "follow"
      , headers: 
        { accept: "text/css,*/*;q=0.1"
        , "accept-encoding": "gzip, deflate"
        , "accept-language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3"
        , "cache-control": "max-age=0"
        , connection: "keep-alive"
        , host: `${host}:${port}`
        , referer: `http://${host}:${port}/`
        , "sec-fetch-dest": "style"
        , "sec-fetch-mode": "no-cors"
        , "sec-fetch-site": "same-origin"
        }
      })
  }

  return {
      requestCSS
    , requestIndex
    , requestJS
  }
}