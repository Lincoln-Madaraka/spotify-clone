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
var constants_exports = {};
__export(constants_exports, {
  constants: () => constants
});
module.exports = __toCommonJS(constants_exports);
const Headers = {
  NextRewrite: "x-middleware-rewrite",
  NextResume: "x-middleware-next",
  NextRedirect: "Location",
  // Used by next to identify internal navigation for app router
  NextUrl: "next-url",
  NextAction: "next-action",
  // Used by next to identify internal navigation for pages router
  NextjsData: "x-nextjs-data"
};
const constants = {
  Headers
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  constants
});
//# sourceMappingURL=constants.js.map