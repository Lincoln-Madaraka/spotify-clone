"use strict";
"use server";
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
var keyless_actions_exports = {};
__export(keyless_actions_exports, {
  createOrReadKeylessAction: () => createOrReadKeylessAction,
  deleteKeylessAction: () => deleteKeylessAction,
  detectKeylessEnvDriftAction: () => detectKeylessEnvDriftAction,
  syncKeylessConfigAction: () => syncKeylessConfigAction
});
module.exports = __toCommonJS(keyless_actions_exports);
var import_headers = require("next/headers");
var import_navigation = require("next/navigation");
var import_errorThrower = require("../server/errorThrower");
var import_headers_utils = require("../server/headers-utils");
var import_keyless = require("../server/keyless");
var import_feature_flags = require("../utils/feature-flags");
const keylessCookieConfig = {
  secure: false,
  httpOnly: false,
  sameSite: "lax"
};
async function syncKeylessConfigAction(args) {
  const { claimUrl, publishableKey, secretKey, returnUrl } = args;
  const cookieStore = await (0, import_headers.cookies)();
  const request = new Request("https://placeholder.com", { headers: await (0, import_headers.headers)() });
  const keyless = await (0, import_keyless.getKeylessCookieValue)((name) => {
    var _a;
    return (_a = cookieStore.get(name)) == null ? void 0 : _a.value;
  });
  const pksMatch = (keyless == null ? void 0 : keyless.publishableKey) === publishableKey;
  const sksMatch = (keyless == null ? void 0 : keyless.secretKey) === secretKey;
  if (pksMatch && sksMatch) {
    return;
  }
  cookieStore.set(
    await (0, import_keyless.getKeylessCookieName)(),
    JSON.stringify({ claimUrl, publishableKey, secretKey }),
    keylessCookieConfig
  );
  if ((0, import_headers_utils.detectClerkMiddleware)(request)) {
    (0, import_navigation.redirect)(`/clerk-sync-keyless?returnUrl=${returnUrl}`, import_navigation.RedirectType.replace);
    return;
  }
  return;
}
async function createOrReadKeylessAction() {
  if (!import_feature_flags.canUseKeyless) {
    return null;
  }
  const result = await import("../server/keyless-node.js").then((m) => m.createOrReadKeyless()).catch(() => null);
  if (!result) {
    import_errorThrower.errorThrower.throwMissingPublishableKeyError();
    return null;
  }
  const { clerkDevelopmentCache, createKeylessModeMessage } = await import("../server/keyless-log-cache.js");
  clerkDevelopmentCache == null ? void 0 : clerkDevelopmentCache.log({
    cacheKey: result.publishableKey,
    msg: createKeylessModeMessage(result)
  });
  const { claimUrl, publishableKey, secretKey, apiKeysUrl } = result;
  void (await (0, import_headers.cookies)()).set(
    await (0, import_keyless.getKeylessCookieName)(),
    JSON.stringify({ claimUrl, publishableKey, secretKey }),
    keylessCookieConfig
  );
  return {
    claimUrl,
    publishableKey,
    apiKeysUrl
  };
}
async function deleteKeylessAction() {
  if (!import_feature_flags.canUseKeyless) {
    return;
  }
  await import("../server/keyless-node.js").then((m) => m.removeKeyless()).catch(() => {
  });
  return;
}
async function detectKeylessEnvDriftAction() {
  if (!import_feature_flags.canUseKeyless) {
    return;
  }
  try {
    const { detectKeylessEnvDrift } = await import("../server/keyless-telemetry.js");
    await detectKeylessEnvDrift();
  } catch {
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createOrReadKeylessAction,
  deleteKeylessAction,
  detectKeylessEnvDriftAction,
  syncKeylessConfigAction
});
