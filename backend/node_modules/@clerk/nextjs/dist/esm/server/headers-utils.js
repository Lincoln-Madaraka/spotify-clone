import "../chunk-BUSYA2B4.js";
import { constants } from "@clerk/backend/internal";
function getCustomAttributeFromRequest(req, key) {
  return key in req ? req[key] : void 0;
}
function getAuthKeyFromRequest(req, key) {
  return getCustomAttributeFromRequest(req, constants.Attributes[key]) || getHeader(req, constants.Headers[key]);
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
export {
  detectClerkMiddleware,
  getAuthKeyFromRequest,
  getCustomAttributeFromRequest,
  getHeader,
  isNextRequest,
  isRequestWebAPI
};
//# sourceMappingURL=headers-utils.js.map