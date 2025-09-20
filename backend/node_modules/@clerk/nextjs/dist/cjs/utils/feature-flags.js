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
var feature_flags_exports = {};
__export(feature_flags_exports, {
  canUseKeyless: () => canUseKeyless
});
module.exports = __toCommonJS(feature_flags_exports);
var import_utils = require("@clerk/shared/utils");
var import_constants = require("../server/constants");
var import_sdk_versions = require("./sdk-versions");
const canUseKeyless = !import_sdk_versions.isNextWithUnstableServerActions && // Next.js will inline the value of 'development' or 'production' on the client bundle, so this is client-safe.
(0, import_utils.isDevelopmentEnvironment)() && !import_constants.KEYLESS_DISABLED;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  canUseKeyless
});
//# sourceMappingURL=feature-flags.js.map