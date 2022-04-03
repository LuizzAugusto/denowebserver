//@ts-check
import { assertStrictEquals } from "./deps/for_tests/asserts.js"
import { createFakeBrowser } from "./FakeBrowser.js"
import { createServerController } from "./ServerController.js"

Deno.test({ name: "RestServerController fetch index", fn: async function() {
  const port = 3007
  const RestServerController = createServerController({ port })
  RestServerController.init()
  const fakeBrowser = createFakeBrowser({ port })
  const res = await fakeBrowser.requestIndex()
  const text = await res.text()
  assertStrictEquals(text, "<p>Hello World!</p>")
  assertStrictEquals(res.status, 200)
  await RestServerController.stop()
}, permissions: { read: "inherit", net: "inherit" } })

Deno.test({ name: "RestServerController fetch js", fn: async function() {
  const port = 3007
  const RestServerController = createServerController({ port })
  RestServerController.init()
  const fakeBrowser = createFakeBrowser({ port })
  const res = await fakeBrowser.requestJS("/script.js")
  const text = await res.text()
  assertStrictEquals(text, "console.log(\"Hello World!\")")
  assertStrictEquals(res.status, 200)
  await RestServerController.stop()
}, permissions: { read: "inherit", net: "inherit" } })

Deno.test({ name: "RestServerController fetch css", fn: async function() {
  const port = 3007
  const RestServerController = createServerController({ port })
  RestServerController.init()
  const fakeBrowser = createFakeBrowser({ port })
  const res = await fakeBrowser.requestCSS("/style.css")
  const text = await res.text()
  assertStrictEquals(text, "body {margin:0;padding:0;}")
  assertStrictEquals(res.status, 200)
  await RestServerController.stop()
}, permissions: { read: "inherit", net: "inherit" } })