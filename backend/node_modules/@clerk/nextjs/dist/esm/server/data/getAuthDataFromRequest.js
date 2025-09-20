import "../../chunk-BUSYA2B4.js";
import {
  AuthStatus,
  constants,
  getAuthObjectForAcceptedToken,
  getAuthObjectFromJwt,
  invalidTokenAuthObject,
  isMachineTokenByPrefix,
  isTokenTypeAccepted,
  signedOutAuthObject,
  TokenType
} from "@clerk/backend/internal";
import { decodeJwt } from "@clerk/backend/jwt";
import { API_URL, API_VERSION, PUBLISHABLE_KEY, SECRET_KEY } from "../constants";
import { getAuthKeyFromRequest, getHeader } from "../headers-utils";
import { assertTokenSignature, decryptClerkRequestData } from "../utils";
const getAuthHeaders = (req) => {
  return {
    authStatus: getAuthKeyFromRequest(req, "AuthStatus"),
    authToken: getAuthKeyFromRequest(req, "AuthToken"),
    authMessage: getAuthKeyFromRequest(req, "AuthMessage"),
    authReason: getAuthKeyFromRequest(req, "AuthReason"),
    authSignature: getAuthKeyFromRequest(req, "AuthSignature")
  };
};
const createAuthOptions = (req, opts, treatPendingAsSignedOut = true) => {
  const encryptedRequestData = getHeader(req, constants.Headers.ClerkRequestData);
  const decryptedRequestData = decryptClerkRequestData(encryptedRequestData);
  return {
    secretKey: (opts == null ? void 0 : opts.secretKey) || decryptedRequestData.secretKey || SECRET_KEY,
    publishableKey: decryptedRequestData.publishableKey || PUBLISHABLE_KEY,
    apiUrl: API_URL,
    apiVersion: API_VERSION,
    authStatus: getAuthKeyFromRequest(req, "AuthStatus"),
    authMessage: getAuthKeyFromRequest(req, "AuthMessage"),
    authReason: getAuthKeyFromRequest(req, "AuthReason"),
    treatPendingAsSignedOut
  };
};
const getSessionAuthDataFromRequest = (req, { treatPendingAsSignedOut = true, ...opts } = {}) => {
  var _a, _b;
  const { authStatus, authMessage, authReason, authToken, authSignature } = getAuthHeaders(req);
  (_a = opts.logger) == null ? void 0 : _a.debug("headers", { authStatus, authMessage, authReason });
  const options = createAuthOptions(req, opts, treatPendingAsSignedOut);
  if (!isTokenTypeAccepted(TokenType.SessionToken, opts.acceptsToken || TokenType.SessionToken)) {
    return signedOutAuthObject(options);
  }
  let authObject;
  if (!authStatus || authStatus !== AuthStatus.SignedIn) {
    authObject = signedOutAuthObject(options);
  } else {
    assertTokenSignature(authToken, options.secretKey, authSignature);
    const jwt = decodeJwt(authToken);
    (_b = opts.logger) == null ? void 0 : _b.debug("jwt", jwt.raw);
    return getAuthObjectFromJwt(jwt, options);
  }
  return authObject;
};
const getAuthDataFromRequest = (req, opts = {}) => {
  var _a, _b;
  const { authStatus, authMessage, authReason } = getAuthHeaders(req);
  (_a = opts.logger) == null ? void 0 : _a.debug("headers", { authStatus, authMessage, authReason });
  const encryptedRequestData = getHeader(req, constants.Headers.ClerkRequestData);
  const decryptedRequestData = decryptClerkRequestData(encryptedRequestData);
  const bearerToken = (_b = getHeader(req, constants.Headers.Authorization)) == null ? void 0 : _b.replace("Bearer ", "");
  const acceptsToken = opts.acceptsToken || TokenType.SessionToken;
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
  if (bearerToken && Array.isArray(acceptsToken) && !acceptsToken.includes(TokenType.SessionToken)) {
    return invalidTokenAuthObject();
  }
  return getSessionAuthDataFromRequest(req, opts);
};
const handleMachineToken = (bearerToken, rawAuthObject, acceptsToken, options) => {
  const hasMachineToken = bearerToken && isMachineTokenByPrefix(bearerToken);
  const acceptsOnlySessionToken = acceptsToken === TokenType.SessionToken || Array.isArray(acceptsToken) && acceptsToken.length === 1 && acceptsToken[0] === TokenType.SessionToken;
  if (hasMachineToken && rawAuthObject && !acceptsOnlySessionToken) {
    const authObject = getAuthObjectForAcceptedToken({
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
export {
  getAuthDataFromRequest,
  getSessionAuthDataFromRequest
};
//# sourceMappingURL=getAuthDataFromRequest.js.map