//@ts-check
import { parse } from "../deps/parse.js"
import { createRestServerController } from "../RestServerController.js"

const { port = "3000", publicFolder = "./public" } = parse(Deno.args)
const ServerController = createRestServerController({ port: parseInt(port), publicFolder })
ServerController.init()