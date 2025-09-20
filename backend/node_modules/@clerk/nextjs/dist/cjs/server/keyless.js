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
var keyless_exports = {};
__export(keyless_exports, {
  getKeylessCookieName: () => getKeylessCookieName,
  getKeylessCookieValue: () => getKeylessCookieValue
});
module.exports = __toCommonJS(keyless_exports);
var import_feature_flags = require("../utils/feature-flags");
const keylessCookiePrefix = `__clerk_keys_`;
async function hashString(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex.slice(0, 16);
}
async function getKeylessCookieName() {
  const PATH = process.env.PWD;
  if (!PATH) {
    return `${keylessCookiePrefix}${0}`;
  }
  const lastThreeDirs = PATH.split("/").filter(Boolean).slice(-3).reverse().join("/");
  const hash = await hashString(lastThreeDirs);
  return `${keylessCookiePrefix}${hash}`;
}
async function getKeylessCookieValue(getter) {
  if (!import_feature_flags.canUseKeyless) {
    return void 0;
  }
  const keylessCookieName = await getKeylessCookieName();
  let keyless;
  try {
    if (keylessCookieName) {
      keyless = JSON.parse(getter(keylessCookieName) || "{}");
    }
  } catch {
    keyless = void 0;
  }
  return keyless;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getKeylessCookieName,
  getKeylessCookieValue
});
//# sourceMappingURL=keyless.js.map