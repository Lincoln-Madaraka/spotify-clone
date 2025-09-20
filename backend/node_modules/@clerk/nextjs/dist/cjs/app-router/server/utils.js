"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var utils_exports = {};
__export(utils_exports, {
  buildRequestLike: () => buildRequestLike,
  getScriptNonceFromHeader: () => getScriptNonceFromHeader,
  isPrerenderingBailout: () => isPrerenderingBailout
});
module.exports = __toCommonJS(utils_exports);
var import_server = require("next/server");
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
    return new import_server.NextRequest("https://placeholder.com", { headers: resolvedHeaders });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildRequestLike,
  getScriptNonceFromHeader,
  isPrerenderingBailout
});
//# sourceMappingURL=utils.js.map