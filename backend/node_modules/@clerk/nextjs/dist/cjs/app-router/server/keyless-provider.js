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
var keyless_provider_exports = {};
__export(keyless_provider_exports, {
  KeylessProvider: () => KeylessProvider,
  getKeylessStatus: () => getKeylessStatus
});
module.exports = __toCommonJS(keyless_provider_exports);
var import_headers = require("next/headers");
var import_react = __toESM(require("react"));
var import_createClerkClient = require("../../server/createClerkClient");
var import_keyless_custom_headers = require("../../server/keyless-custom-headers");
var import_feature_flags = require("../../utils/feature-flags");
var import_mergeNextClerkPropsWithEnv = require("../../utils/mergeNextClerkPropsWithEnv");
var import_only_try = require("../../utils/only-try");
var import_ClerkProvider = require("../client/ClerkProvider");
var import_keyless_actions = require("../keyless-actions");
async function getKeylessStatus(params) {
  let [shouldRunAsKeyless, runningWithClaimedKeys, locallyStoredPublishableKey] = [false, false, ""];
  if (import_feature_flags.canUseKeyless) {
    locallyStoredPublishableKey = await import("../../server/keyless-node.js").then((mod) => {
      var _a;
      return ((_a = mod.safeParseClerkFile()) == null ? void 0 : _a.publishableKey) || "";
    }).catch(() => "");
    runningWithClaimedKeys = Boolean(params.publishableKey) && params.publishableKey === locallyStoredPublishableKey;
    shouldRunAsKeyless = !params.publishableKey || runningWithClaimedKeys;
  }
  return {
    shouldRunAsKeyless,
    runningWithClaimedKeys
  };
}
const KeylessProvider = async (props) => {
  const { rest, runningWithClaimedKeys, generateNonce, generateStatePromise, children } = props;
  const newOrReadKeys = await import("../../server/keyless-node.js").then((mod) => mod.createOrReadKeyless()).catch(() => null);
  const { clerkDevelopmentCache, createConfirmationMessage, createKeylessModeMessage } = await import("../../server/keyless-log-cache.js");
  if (!newOrReadKeys) {
    return /* @__PURE__ */ import_react.default.createElement(
      import_ClerkProvider.ClientClerkProvider,
      {
        ...(0, import_mergeNextClerkPropsWithEnv.mergeNextClerkPropsWithEnv)(rest),
        nonce: await generateNonce(),
        initialState: await generateStatePromise(),
        disableKeyless: true
      },
      children
    );
  }
  const clientProvider = /* @__PURE__ */ import_react.default.createElement(
    import_ClerkProvider.ClientClerkProvider,
    {
      ...(0, import_mergeNextClerkPropsWithEnv.mergeNextClerkPropsWithEnv)({
        ...rest,
        publishableKey: newOrReadKeys.publishableKey,
        __internal_keyless_claimKeylessApplicationUrl: newOrReadKeys.claimUrl,
        __internal_keyless_copyInstanceKeysUrl: newOrReadKeys.apiKeysUrl,
        // Explicitly use `null` instead of `undefined` here to avoid persisting `deleteKeylessAction` during merging of options.
        __internal_keyless_dismissPrompt: runningWithClaimedKeys ? import_keyless_actions.deleteKeylessAction : null
      }),
      nonce: await generateNonce(),
      initialState: await generateStatePromise()
    },
    children
  );
  if (runningWithClaimedKeys) {
    try {
      const secretKey = await import("../../server/keyless-node.js").then((mod) => {
        var _a;
        return (_a = mod.safeParseClerkFile()) == null ? void 0 : _a.secretKey;
      });
      if (!secretKey) {
        throw new Error("Missing secret key from `.clerk/`");
      }
      const client = (0, import_createClerkClient.createClerkClientWithOptions)({
        secretKey
      });
      const keylessHeaders = await (0, import_keyless_custom_headers.collectKeylessMetadata)().then(import_keyless_custom_headers.formatMetadataHeaders).catch(() => new Headers());
      await (clerkDevelopmentCache == null ? void 0 : clerkDevelopmentCache.run(
        () => client.__experimental_accountlessApplications.completeAccountlessApplicationOnboarding({
          requestHeaders: keylessHeaders
        }),
        {
          cacheKey: `${newOrReadKeys.publishableKey}_complete`,
          onSuccessStale: 24 * 60 * 60 * 1e3
          // 24 hours
        }
      ));
    } catch {
    }
    clerkDevelopmentCache == null ? void 0 : clerkDevelopmentCache.log({
      cacheKey: `${newOrReadKeys.publishableKey}_claimed`,
      msg: createConfirmationMessage()
    });
    return clientProvider;
  }
  const KeylessCookieSync = await import("../client/keyless-cookie-sync.js").then((mod) => mod.KeylessCookieSync);
  const headerStore = await (0, import_headers.headers)();
  const host = headerStore.get("x-forwarded-host");
  const proto = headerStore.get("x-forwarded-proto");
  const claimUrl = new URL(newOrReadKeys.claimUrl);
  if (host && proto) {
    (0, import_only_try.onlyTry)(() => claimUrl.searchParams.set("return_url", new URL(`${proto}://${host}`).href));
  }
  clerkDevelopmentCache == null ? void 0 : clerkDevelopmentCache.log({
    cacheKey: newOrReadKeys.publishableKey,
    msg: createKeylessModeMessage({ ...newOrReadKeys, claimUrl: claimUrl.href })
  });
  return /* @__PURE__ */ import_react.default.createElement(KeylessCookieSync, { ...newOrReadKeys }, clientProvider);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KeylessProvider,
  getKeylessStatus
});
//# sourceMappingURL=keyless-provider.js.map