import "../../chunk-BUSYA2B4.js";
import { NextRequest } from "next/server";
const isPrerenderingBailout = (e) => {
  if (!(e instanceof Error) || !("message" in e)) {
    return false;
  }
  const { message } = e;
  const lowerCaseInput = message.toLowerCase();
  const dynamicServerUsage = lowerCaseInput.includes("dynamic server usage");
  const bailOutPrerendering = lowerCaseInput.includes("this page needs to bail out of prerendering");
  const routeRegex = /Route .*? needs to bail out of prerendering at this point because it used .*?./;
  return routeRegex.test(message) || dynamicServerUsage || bailOutPrerendering;
};
async function buildRequestLike() {
  try {
    const { headers } = await import("next/headers");
    const resolvedHeaders = await headers();
    return new NextRequest("https://placeholder.com", { headers: resolvedHeaders });
  } catch (e) {
    if (e && isPrerenderingBailout(e)) {
      throw e;
    }
    throw new Error(
      `Clerk: auth(), currentUser() and clerkClient(), are only supported in App Router (/app directory).
If you're using /pages, try getAuth() instead.
Original error: ${e}`
    );
  }
}
function getScriptNonceFromHeader(cspHeaderValue) {
  var _a;
  const directives = cspHeaderValue.split(";").map((directive2) => directive2.trim());
  const directive = directives.find((dir) => dir.startsWith("script-src")) || directives.find((dir) => dir.startsWith("default-src"));
  if (!directive) {
    return;
  }
  const nonce = (_a = directive.split(" ").slice(1).map((source) => source.trim()).find((source) => source.startsWith("'nonce-") && source.length > 8 && source.endsWith("'"))) == null ? void 0 : _a.slice(7, -1);
  if (!nonce) {
    return;
  }
  if (/[&><\u2028\u2029]/g.test(nonce)) {
    throw new Error(
      "Nonce value from Content-Security-Policy contained invalid HTML escape characters, which is disallowed for security reasons. Make sure that your nonce value does not contain the following characters: `<`, `>`, `&`"
    );
  }
  return nonce;
}
export {
  buildRequestLike,
  getScriptNonceFromHeader,
  isPrerenderingBailout
};
//# sourceMappingURL=utils.js.map