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
var errors_exports = {};
__export(errors_exports, {
  EmailLinkErrorCode: () => import_hooks.EmailLinkErrorCode,
  EmailLinkErrorCodeStatus: () => import_hooks.EmailLinkErrorCodeStatus,
  isClerkAPIResponseError: () => import_errors.isClerkAPIResponseError,
  isClerkRuntimeError: () => import_hooks.isClerkRuntimeError,
  isEmailLinkError: () => import_hooks.isEmailLinkError,
  isKnownError: () => import_hooks.isKnownError,
  isMetamaskError: () => import_hooks.isMetamaskError,
  isReverificationCancelledError: () => import_hooks.isReverificationCancelledError
});
module.exports = __toCommonJS(errors_exports);
var import_hooks = require("./client-boundary/hooks");
var import_errors = require("@clerk/clerk-react/errors");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmailLinkErrorCode,
  EmailLinkErrorCodeStatus,
  isClerkAPIResponseError,
  isClerkRuntimeError,
  isEmailLinkError,
  isKnownError,
  isMetamaskError,
  isReverificationCancelledError
});
//# sourceMappingURL=errors.js.map