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
var mergeNextClerkPropsWithEnv_exports = {};
__export(mergeNextClerkPropsWithEnv_exports, {
  mergeNextClerkPropsWithEnv: () => mergeNextClerkPropsWithEnv
});
module.exports = __toCommonJS(mergeNextClerkPropsWithEnv_exports);
var import_underscore = require("@clerk/shared/underscore");
var import_constants = require("../server/constants");
const mergeNextClerkPropsWithEnv = (props) => {
  var _a;
  return {
    ...props,
    publishableKey: props.publishableKey || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
    clerkJSUrl: props.clerkJSUrl || process.env.NEXT_PUBLIC_CLERK_JS_URL,
    clerkJSVersion: props.clerkJSVersion || process.env.NEXT_PUBLIC_CLERK_JS_VERSION,
    proxyUrl: props.proxyUrl || process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "",
    domain: props.domain || process.env.NEXT_PUBLIC_CLERK_DOMAIN || "",
    isSatellite: props.isSatellite || (0, import_underscore.isTruthy)(process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE),
    signInUrl: props.signInUrl || process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "",
    signUpUrl: props.signUpUrl || process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "",
    signInForceRedirectUrl: props.signInForceRedirectUrl || process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL || "",
    signUpForceRedirectUrl: props.signUpForceRedirectUrl || process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL || "",
    signInFallbackRedirectUrl: props.signInFallbackRedirectUrl || process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL || "",
    signUpFallbackRedirectUrl: props.signUpFallbackRedirectUrl || process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL || "",
    afterSignInUrl: props.afterSignInUrl || process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "",
    afterSignUpUrl: props.afterSignUpUrl || process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || "",
    newSubscriptionRedirectUrl: props.newSubscriptionRedirectUrl || process.env.NEXT_PUBLIC_CLERK_CHECKOUT_CONTINUE_URL || "",
    telemetry: (_a = props.telemetry) != null ? _a : {
      disabled: (0, import_underscore.isTruthy)(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED),
      debug: (0, import_underscore.isTruthy)(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DEBUG)
    },
    sdkMetadata: import_constants.SDK_METADATA
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mergeNextClerkPropsWithEnv
});
//# sourceMappingURL=mergeNextClerkPropsWithEnv.js.map