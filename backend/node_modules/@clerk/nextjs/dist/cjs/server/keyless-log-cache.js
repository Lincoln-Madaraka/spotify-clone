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
var keyless_log_cache_exports = {};
__export(keyless_log_cache_exports, {
  clerkDevelopmentCache: () => clerkDevelopmentCache,
  createConfirmationMessage: () => createConfirmationMessage,
  createKeylessModeMessage: () => createKeylessModeMessage
});
module.exports = __toCommonJS(keyless_log_cache_exports);
var import_utils = require("@clerk/shared/utils");
const THROTTLE_DURATION_MS = 10 * 60 * 1e3;
function createClerkDevCache() {
  if (!(0, import_utils.isDevelopmentEnvironment)()) {
    return;
  }
  if (!global.__clerk_internal_keyless_logger) {
    global.__clerk_internal_keyless_logger = {
      __cache: /* @__PURE__ */ new Map(),
      log: function({ cacheKey, msg }) {
        var _a;
        if (this.__cache.has(cacheKey) && Date.now() < (((_a = this.__cache.get(cacheKey)) == null ? void 0 : _a.expiresAt) || 0)) {
          return;
        }
        console.log(msg);
        this.__cache.set(cacheKey, {
          expiresAt: Date.now() + THROTTLE_DURATION_MS
        });
      },
      run: async function(callback, { cacheKey, onSuccessStale = THROTTLE_DURATION_MS, onErrorStale = THROTTLE_DURATION_MS }) {
        var _a, _b;
        if (this.__cache.has(cacheKey) && Date.now() < (((_a = this.__cache.get(cacheKey)) == null ? void 0 : _a.expiresAt) || 0)) {
          return (_b = this.__cache.get(cacheKey)) == null ? void 0 : _b.data;
        }
        try {
          const result = await callback();
          this.__cache.set(cacheKey, {
            expiresAt: Date.now() + onSuccessStale,
            data: result
          });
          return result;
        } catch (e) {
          this.__cache.set(cacheKey, {
            expiresAt: Date.now() + onErrorStale
          });
          throw e;
        }
      }
    };
  }
  return globalThis.__clerk_internal_keyless_logger;
}
const createKeylessModeMessage = (keys) => {
  return `
\x1B[35m
[Clerk]:\x1B[0m You are running in keyless mode.
You can \x1B[35mclaim your keys\x1B[0m by visiting ${keys.claimUrl}
`;
};
const createConfirmationMessage = () => {
  return `
\x1B[35m
[Clerk]:\x1B[0m Your application is running with your claimed keys.
You can safely remove the \x1B[35m.clerk/\x1B[0m from your project.
`;
};
const clerkDevelopmentCache = createClerkDevCache();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clerkDevelopmentCache,
  createConfirmationMessage,
  createKeylessModeMessage
});
//# sourceMappingURL=keyless-log-cache.js.map