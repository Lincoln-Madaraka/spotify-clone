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
var headers_utils_exports = {};
__export(headers_utils_exports, {
  detectClerkMiddleware: () => detectClerkMiddleware,
  getAuthKeyFromRequest: () => getAuthKeyFromRequest,
  getCustomAttributeFromRequest: () => getCustomAttributeFromRequest,
  getHeader: () => getHeader,
  isNextRequest: () => isNextRequest,
  isRequestWebAPI: () => isRequestWebAPI
});
module.exports = __toCommonJS(headers_utils_exports);
var import_internal = require("@clerk/backend/internal");
function getCustomAttributeFromRequest(req, key) {
  return key in req ? req[key] : void 0;
}
function getAuthKeyFromRequest(req, key) {
  return getCustomAttributeFromRequest(req, import_internal.constants.Attributes[key]) || getHeader(req, import_internal.constants.Headers[key]);
}
function getHeader(req, name) {
  var _a, _b;
  if (isNextRequest(req) || isRequestWebAPI(req)) {
    return req.headers.get(name);
  }
  return req.headers[name] || req.headers[name.toLowerCase()] || ((_b = (_a = req.socket) == null ? void 0 : _a._httpMessage) == null ? void 0 : _b.getHeader(name));
}
function detectClerkMiddleware(req) {
  return Boolean(getAuthKeyFromRequest(req, "AuthStatus"));
}
function isNextRequest(val) {
  try {
    const { headers, nextUrl, cookies } = val || {};
    return typeof (headers == null ? void 0 : headers.get) === "function" && typeof (nextUrl == null ? void 0 : nextUrl.searchParams.get) === "function" && typeof (cookies == null ? void 0 : cookies.get) === "function";
  } catch {
    return false;
  }
}
function isRequestWebAPI(val) {
  try {
    const { headers } = val || {};
    return typeof (headers == null ? void 0 : headers.get) === "function";
  } catch {
    return false;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  detectClerkMiddleware,
  getAuthKeyFromRequest,
  getCustomAttributeFromRequest,
  getHeader,
  isNextRequest,
  isRequestWebAPI
});
//# sourceMappingURL=headers-utils.js.map