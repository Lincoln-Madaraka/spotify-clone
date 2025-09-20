"use strict";
"use server";
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
var server_actions_exports = {};
__export(server_actions_exports, {
  invalidateCacheAction: () => invalidateCacheAction
});
module.exports = __toCommonJS(server_actions_exports);
var import_headers = require("next/headers");
async function invalidateCacheAction() {
  void (await (0, import_headers.cookies)()).delete(`__clerk_invalidate_cache_cookie_${Date.now()}`);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  invalidateCacheAction
});
