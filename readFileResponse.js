//@ts-check
/**
 * 
 * @param {string} path 
 * @param {string|undefined} contentType 
 */
export function readFileResponse(path, contentType = "text/plain") {
  try {
    const buffer = Deno.readFileSync(path)
    // @ts-ignore {content-type is valid}
    return new Response(buffer, { "content-type": contentType, status: 200 })
  }
  catch(e) { Promise.resolve(console.error(e)) }
  return new Response(undefined, { status: 404 })
}