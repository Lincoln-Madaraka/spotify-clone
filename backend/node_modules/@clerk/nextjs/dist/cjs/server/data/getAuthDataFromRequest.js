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
var getAuthDataFromRequest_exports = {};
__export(getAuthDataFromRequest_exports, {
  getAuthDataFromRequest: () => getAuthDataFromRequest,
  getSessionAuthDataFromRequest: () => getSessionAuthDataFromRequest
});
module.exports = __toCommonJS(getAuthDataFromRequest_exports);
var import_internal = require("@clerk/backend/internal");
var import_jwt = require("@clerk/backend/jwt");
var import_constants = require("../constants");
var import_headers_utils = require("../headers-utils");
var import_utils = require("../utils");
const getAuthHeaders = (req) => {
  return {
    authStatus: (0, import_headers_utils.getAuthKeyFromRequest)(req, "AuthStatus"),
    authToken: (0, import_headers_utils.getAuthKeyFromRequest)(req, "AuthToken"),
    authMessage: (0, import_headers_utils.getAuthKeyFromRequest)(req, "AuthMessage"),
    authReason: (0, import_headers_utils.getAuthKeyFromRequest)(req, "AuthReason"),
    authSignature: (0, import_headers_utils.getAuthKeyFromRequest)(req, "AuthSignature")
  };
};
const createAuthOptions = (req, opts, treatPendingAsSignedOut = true) => {
  const encryptedRequestData = (0, import_headers_utils.getHeader)(req, import_internal.constants.Headers.ClerkRequestData);
  const decryptedRequestData = (0, import_utils.decryptClerkRequestData)(encryptedRequestData);
  return {
    secretKey: (opts == null ? void 0 : opts.secretKey) || decryptedRequestData.secretKey || import_constants.SECRET_KEY,
    publishableKey: decryptedRequestData.publishableKey || import_constants.PUBLISHABLE_KEY,
    apiUrl: import_constants.API_URL,
    apiVersion: import_constants.API_VERSION,
    authStatus: (0, import_headers_utils.getAuthKeyFromRequest)(req, "AuthStatus"),
    authMessage: (0, import_headers_utils.getAuthKeyFromRequest)(req, "AuthMessage"),
    authReason: (0, import_headers_utils.getAuthKeyFromRequest)(req, "AuthReason"),
    treatPendingAsSignedOut
  };
};
const getSessionAuthDataFromRequest = (req, { treatPendingAsSignedOut = true, ...opts } = {}) => {
  var _a, _b;
  const { authStatus, authMessage, authReason, authToken, authSignature } = getAuthHeaders(req);
  (_a = opts.logger) == null ? void 0 : _a.debug("headers", { authStatus, authMessage, authReason });
  const options = createAuthOptions(req, opts, treatPendingAsSignedOut);
  if (!(0, import_internal.isTokenTypeAccepted)(import_internal.TokenType.SessionToken, opts.acceptsToken || import_internal.TokenType.SessionToken)) {
    return (0, import_internal.signedOutAuthObject)(options);
  }
  let authObject;
  if (!authStatus || authStatus !== import_internal.AuthStatus.SignedIn) {
    authObject = (0, import_internal.signedOutAuthObject)(options);
  } else {
    (0, import_utils.assertTokenSignature)(authToken, options.secretKey, authSignature);
    const jwt = (0, import_jwt.decodeJwt)(authToken);
    (_b = opts.logger) == null ? void 0 : _b.debug("jwt", jwt.raw);
    return (0, import_internal.getAuthObjectFromJwt)(jwt, options);
  }
  return authObject;
};
const getAuthDataFromRequest = (req, opts = {}) => {
  var _a, _b;
  const { authStatus, authMessage, authReason } = getAuthHeaders(req);
  (_a = opts.logger) == null ? void 0 : _a.debug("headers", { authStatus, authMessage, authReason });
  const encryptedRequestData = (0, import_headers_utils.getHeader)(req, import_internal.constants.Headers.ClerkRequestData);
  const decryptedRequestData = (0, import_utils.decryptClerkRequestData)(encryptedRequestData);
  const bearerToken = (_b = (0, import_headers_utils.getHeader)(req, import_internal.constants.Headers.Authorization)) == null ? void 0 : _b.replace("Bearer ", "");
  const acceptsToken = opts.acceptsToken || import_internal.TokenType.SessionToken;
  const options = createAuthOptions(req, opts);
  const machineAuthObject = handleMachineToken(
    bearerToken,
    decryptedRequestData.machineAuthObject,
    acceptsToken,
    options
  );
  if (machineAuthObject) {
    return machineAuthObject;
  }
  if (bearerToken && Array.isArray(acceptsToken) && !acceptsToken.includes(import_internal.TokenType.SessionToken)) {
    return (0, import_internal.invalidTokenAuthObject)();
  }
  return getSessionAuthDataFromRequest(req, opts);
};
const handleMachineToken = (bearerToken, rawAuthObject, acceptsToken, options) => {
  const hasMachineToken = bearerToken && (0, import_internal.isMachineTokenByPrefix)(bearerToken);
  const acceptsOnlySessionToken = acceptsToken === import_internal.TokenType.SessionToken || Array.isArray(acceptsToken) && acceptsToken.length === 1 && acceptsToken[0] === import_internal.TokenType.SessionToken;
  if (hasMachineToken && rawAuthObject && !acceptsOnlySessionToken) {
    const authObject = (0, import_internal.getAuthObjectForAcceptedToken)({
      authObject: {
        ...rawAuthObject,
        debug: () => options
      },
      acceptsToken
    });
    return {
      ...authObject,
      getToken: () => authObject.isAuthenticated ? Promise.resolve(bearerToken) : Promise.resolve(null),
      has: () => false
    };
  }
  return null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAuthDataFromRequest,
  getSessionAuthDataFromRequest
});
//# sourceMappingURL=getAuthDataFromRequest.js.map