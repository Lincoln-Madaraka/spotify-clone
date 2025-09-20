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
var routeMatcher_exports = {};
__export(routeMatcher_exports, {
  createRouteMatcher: () => createRouteMatcher
});
module.exports = __toCommonJS(routeMatcher_exports);
var import_pathMatcher = require("@clerk/shared/pathMatcher");
const createRouteMatcher = (routes) => {
  if (typeof routes === "function") {
    return (req) => routes(req);
  }
  const matcher = (0, import_pathMatcher.createPathMatcher)(routes);
  return (req) => matcher(req.nextUrl.pathname);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRouteMatcher
});
//# sourceMappingURL=routeMatcher.js.map