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
var createGetAuth_exports = {};
__export(createGetAuth_exports, {
  createAsyncGetAuth: () => createAsyncGetAuth,
  createSyncGetAuth: () => createSyncGetAuth,
  getAuth: () => getAuth
});
module.exports = __toCommonJS(createGetAuth_exports);
var import_internal = require("@clerk/backend/internal");
var import_underscore = require("@clerk/shared/underscore");
var import_debugLogger = require("../utils/debugLogger");
var import_sdk_versions = require("../utils/sdk-versions");
var import_getAuthDataFromRequest = require("./data/getAuthDataFromRequest");
var import_errors = require("./errors");
var import_headers_utils = require("./headers-utils");
var import_utils = require("./utils");
const createAsyncGetAuth = ({
  debugLoggerName,
  noAuthStatusMessage
}) => (0, import_debugLogger.withLogger)(debugLoggerName, (logger) => {
  return async (req, opts) => {
    if ((0, import_underscore.isTruthy)((0, import_headers_utils.getHeader)(req, import_internal.constants.Headers.EnableDebug))) {
      logger.enable();
    }
    if (!(0, import_headers_utils.detectClerkMiddleware)(req)) {
      if (import_sdk_versions.isNextWithUnstableServerActions) {
        (0, import_utils.assertAuthStatus)(req, noAuthStatusMessage);
      }
      const missConfiguredMiddlewareLocation = await import("./fs/middleware-location.js").then((m) => m.suggestMiddlewareLocation()).catch(() => void 0);
      if (missConfiguredMiddlewareLocation) {
        throw new Error(missConfiguredMiddlewareLocation);
      }
      (0, import_utils.assertAuthStatus)(req, noAuthStatusMessage);
    }
    const getAuthDataFromRequest = (req2, opts2 = {}) => {
      return (0, import_getAuthDataFromRequest.getAuthDataFromRequest)(req2, { ...opts2, logger, acceptsToken: opts2 == null ? void 0 : opts2.acceptsToken });
    };
    return getAuthDataFromRequest(req, { ...opts, logger, acceptsToken: opts == null ? void 0 : opts.acceptsToken });
  };
});
const createSyncGetAuth = ({
  debugLoggerName,
  noAuthStatusMessage
}) => (0, import_debugLogger.withLogger)(debugLoggerName, (logger) => {
  return (req, opts) => {
    if ((0, import_underscore.isTruthy)((0, import_headers_utils.getHeader)(req, import_internal.constants.Headers.EnableDebug))) {
      logger.enable();
    }
    (0, import_utils.assertAuthStatus)(req, noAuthStatusMessage);
    const getAuthDataFromRequest = (req2, opts2 = {}) => {
      return (0, import_getAuthDataFromRequest.getSessionAuthDataFromRequest)(req2, { ...opts2, logger, acceptsToken: opts2 == null ? void 0 : opts2.acceptsToken });
    };
    return getAuthDataFromRequest(req, { ...opts, logger, acceptsToken: opts == null ? void 0 : opts.acceptsToken });
  };
});
const getAuth = createSyncGetAuth({
  debugLoggerName: "getAuth()",
  noAuthStatusMessage: (0, import_errors.getAuthAuthHeaderMissing)()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAsyncGetAuth,
  createSyncGetAuth,
  getAuth
});
//# sourceMappingURL=createGetAuth.js.map