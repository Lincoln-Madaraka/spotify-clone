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
var ClerkProvider_exports = {};
__export(ClerkProvider_exports, {
  ClerkProvider: () => ClerkProvider
});
module.exports = __toCommonJS(ClerkProvider_exports);
var import_headers = require("next/headers");
var import_react = __toESM(require("react"));
var import_PromisifiedAuthProvider = require("../../client-boundary/PromisifiedAuthProvider");
var import_buildClerkProps = require("../../server/buildClerkProps");
var import_mergeNextClerkPropsWithEnv = require("../../utils/mergeNextClerkPropsWithEnv");
var import_sdk_versions = require("../../utils/sdk-versions");
var import_ClerkProvider = require("../client/ClerkProvider");
var import_keyless_provider = require("./keyless-provider");
var import_utils = require("./utils");
const getDynamicClerkState = import_react.default.cache(async function getDynamicClerkState2() {
  const request = await (0, import_utils.buildRequestLike)();
  const data = (0, import_buildClerkProps.getDynamicAuthData)(request);
  return data;
});
const getNonceHeaders = import_react.default.cache(async function getNonceHeaders2() {
  const headersList = await (0, import_headers.headers)();
  const nonce = headersList.get("X-Nonce");
  return nonce ? nonce : (
    // Fallback to extracting from CSP header
    (0, import_utils.getScriptNonceFromHeader)(headersList.get("Content-Security-Policy") || "") || ""
  );
});
async function ClerkProvider(props) {
  const { children, dynamic, ...rest } = props;
  async function generateStatePromise() {
    if (!dynamic) {
      return Promise.resolve(null);
    }
    if (import_sdk_versions.isNext13) {
      return Promise.resolve(await getDynamicClerkState());
    }
    return getDynamicClerkState();
  }
  async function generateNonce() {
    if (!dynamic) {
      return Promise.resolve("");
    }
    if (import_sdk_versions.isNext13) {
      return Promise.resolve(await getNonceHeaders());
    }
    return getNonceHeaders();
  }
  const propsWithEnvs = (0, import_mergeNextClerkPropsWithEnv.mergeNextClerkPropsWithEnv)({
    ...rest
  });
  const { shouldRunAsKeyless, runningWithClaimedKeys } = await (0, import_keyless_provider.getKeylessStatus)(propsWithEnvs);
  let output;
  try {
    const detectKeylessEnvDrift = await import("../../server/keyless-telemetry.js").then(
      (mod) => mod.detectKeylessEnvDrift
    );
    await detectKeylessEnvDrift();
  } catch {
  }
  if (shouldRunAsKeyless) {
    output = /* @__PURE__ */ import_react.default.createElement(
      import_keyless_provider.KeylessProvider,
      {
        rest: propsWithEnvs,
        generateNonce,
        generateStatePromise,
        runningWithClaimedKeys
      },
      children
    );
  } else {
    output = /* @__PURE__ */ import_react.default.createElement(
      import_ClerkProvider.ClientClerkProvider,
      {
        ...propsWithEnvs,
        nonce: await generateNonce(),
        initialState: await generateStatePromise()
      },
      children
    );
  }
  if (dynamic) {
    return (
      // TODO: fix types so AuthObject is compatible with InitialState
      /* @__PURE__ */ import_react.default.createElement(import_PromisifiedAuthProvider.PromisifiedAuthProvider, { authPromise: generateStatePromise() }, output)
    );
  }
  return output;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClerkProvider
});
//# sourceMappingURL=ClerkProvider.js.map