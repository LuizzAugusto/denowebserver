//@ts-check
import { parse } from "../deps/parse.js"
import { createServerController } from "../ServerController.js"

const { port = "3000", publicFolder = "./public" } = parse(Deno.args)
const ServerController = createServerController({ port: parseInt(port), publicFolder })
ServerController.init()