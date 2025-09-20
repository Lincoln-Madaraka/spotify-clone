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
var nextErrors_exports = {};
__export(nextErrors_exports, {
  HTTP_ERROR_FALLBACK_ERROR_CODE: () => HTTP_ERROR_FALLBACK_ERROR_CODE,
  isHTTPAccessFallbackError: () => isHTTPAccessFallbackError,
  isLegacyNextjsNotFoundError: () => isLegacyNextjsNotFoundError,
  isNextjsNotFoundError: () => isNextjsNotFoundError,
  isNextjsRedirectError: () => isNextjsRedirectError,
  isNextjsUnauthorizedError: () => isNextjsUnauthorizedError,
  isRedirectToSignInError: () => isRedirectToSignInError,
  isRedirectToSignUpError: () => isRedirectToSignUpError,
  nextjsRedirectError: () => nextjsRedirectError,
  redirectToSignInError: () => redirectToSignInError,
  redirectToSignUpError: () => redirectToSignUpError,
  unauthorized: () => unauthorized,
  whichHTTPAccessFallbackError: () => whichHTTPAccessFallbackError
});
module.exports = __toCommonJS(nextErrors_exports);
const CONTROL_FLOW_ERROR = {
  REDIRECT_TO_URL: "CLERK_PROTECT_REDIRECT_TO_URL",
  REDIRECT_TO_SIGN_IN: "CLERK_PROTECT_REDIRECT_TO_SIGN_IN",
  REDIRECT_TO_SIGN_UP: "CLERK_PROTECT_REDIRECT_TO_SIGN_UP"
};
const LEGACY_NOT_FOUND_ERROR_CODE = "NEXT_NOT_FOUND";
function isLegacyNextjsNotFoundError(error) {
  if (typeof error !== "object" || error === null || !("digest" in error)) {
    return false;
  }
  return error.digest === LEGACY_NOT_FOUND_ERROR_CODE;
}
const HTTPAccessErrorStatusCodes = {
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatusCodes));
const HTTP_ERROR_FALLBACK_ERROR_CODE = "NEXT_HTTP_ERROR_FALLBACK";
function isHTTPAccessFallbackError(error) {
  if (typeof error !== "object" || error === null || !("digest" in error) || typeof error.digest !== "string") {
    return false;
  }
  const [prefix, httpStatus] = error.digest.split(";");
  return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
}
function whichHTTPAccessFallbackError(error) {
  if (!isHTTPAccessFallbackError(error)) {
    return void 0;
  }
  const [, httpStatus] = error.digest.split(";");
  return Number(httpStatus);
}
function isNextjsNotFoundError(error) {
  return isLegacyNextjsNotFoundError(error) || // Checks for the error thrown from `notFound()` for canary versions of next@15
  whichHTTPAccessFallbackError(error) === HTTPAccessErrorStatusCodes.NOT_FOUND;
}
const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
function nextjsRedirectError(url, extra, type = "replace", statusCode = 307) {
  const error = new Error(REDIRECT_ERROR_CODE);
  error.digest = `${REDIRECT_ERROR_CODE};${type};${url};${statusCode};`;
  error.clerk_digest = CONTROL_FLOW_ERROR.REDIRECT_TO_URL;
  Object.assign(error, extra);
  throw error;
}
function buildReturnBackUrl(url, returnBackUrl) {
  return returnBackUrl === null ? "" : returnBackUrl || url;
}
function redirectToSignInError(url, returnBackUrl) {
  nextjsRedirectError(url, {
    clerk_digest: CONTROL_FLOW_ERROR.REDIRECT_TO_SIGN_IN,
    returnBackUrl: buildReturnBackUrl(url, returnBackUrl)
  });
}
function redirectToSignUpError(url, returnBackUrl) {
  nextjsRedirectError(url, {
    clerk_digest: CONTROL_FLOW_ERROR.REDIRECT_TO_SIGN_UP,
    returnBackUrl: buildReturnBackUrl(url, returnBackUrl)
  });
}
function isNextjsRedirectError(error) {
  if (typeof error !== "object" || error === null || !("digest" in error) || typeof error.digest !== "string") {
    return false;
  }
  const digest = error.digest.split(";");
  const [errorCode, type] = digest;
  const destination = digest.slice(2, -2).join(";");
  const status = digest.at(-2);
  const statusCode = Number(status);
  return errorCode === REDIRECT_ERROR_CODE && (type === "replace" || type === "push") && typeof destination === "string" && !isNaN(statusCode) && statusCode === 307;
}
function isRedirectToSignInError(error) {
  if (isNextjsRedirectError(error) && "clerk_digest" in error) {
    return error.clerk_digest === CONTROL_FLOW_ERROR.REDIRECT_TO_SIGN_IN;
  }
  return false;
}
function isRedirectToSignUpError(error) {
  if (isNextjsRedirectError(error) && "clerk_digest" in error) {
    return error.clerk_digest === CONTROL_FLOW_ERROR.REDIRECT_TO_SIGN_UP;
  }
  return false;
}
function isNextjsUnauthorizedError(error) {
  return whichHTTPAccessFallbackError(error) === HTTPAccessErrorStatusCodes.UNAUTHORIZED;
}
function unauthorized() {
  const error = new Error(HTTP_ERROR_FALLBACK_ERROR_CODE);
  error.digest = `${HTTP_ERROR_FALLBACK_ERROR_CODE};${HTTPAccessErrorStatusCodes.UNAUTHORIZED}`;
  throw error;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HTTP_ERROR_FALLBACK_ERROR_CODE,
  isHTTPAccessFallbackError,
  isLegacyNextjsNotFoundError,
  isNextjsNotFoundError,
  isNextjsRedirectError,
  isNextjsUnauthorizedError,
  isRedirectToSignInError,
  isRedirectToSignUpError,
  nextjsRedirectError,
  redirectToSignInError,
  redirectToSignUpError,
  unauthorized,
  whichHTTPAccessFallbackError
});
//# sourceMappingURL=nextErrors.js.map