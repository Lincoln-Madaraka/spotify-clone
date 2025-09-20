"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var serverRedirectWithAuth_exports = {};
__export(serverRedirectWithAuth_exports, {
  serverRedirectWithAuth: () => serverRedirectWithAuth
});
module.exports = __toCommonJS(serverRedirectWithAuth_exports);
var import_internal = require("@clerk/backend/internal");
var import_devBrowser = require("@clerk/shared/devBrowser");
var import_keys = require("@clerk/shared/keys");
var import_server = require("next/server");
const serverRedirectWithAuth = (clerkRequest, res, opts) => {
  const location = res.headers.get("location");
  const shouldAppendDevBrowser = res.headers.get(import_internal.constants.Headers.ClerkRedirectTo) === "true";
  if (shouldAppendDevBrowser && !!location && (0, import_keys.isDevelopmentFromSecretKey)(opts.secretKey) && clerkRequest.clerkUrl.isCrossOrigin(location)) {
    const dbJwt = clerkRequest.cookies.get(import_devBrowser.DEV_BROWSER_JWT_KEY) || "";
    const url = new URL(location);
    const urlWithDevBrowser = (0, import_devBrowser.setDevBrowserJWTInURL)(url, dbJwt);
    return import_server.NextResponse.redirect(urlWithDevBrowser.href, res);
  }
  return res;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  serverRedirectWithAuth
});
//# sourceMappingURL=serverRedirectWithAuth.js.map