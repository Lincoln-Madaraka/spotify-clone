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
var removeBasePath_exports = {};
__export(removeBasePath_exports, {
  removeBasePath: () => removeBasePath
});
module.exports = __toCommonJS(removeBasePath_exports);
function removeBasePath(to) {
  let destination = to;
  const basePath = process.env.__NEXT_ROUTER_BASEPATH;
  if (basePath && destination.startsWith(basePath)) {
    destination = destination.slice(basePath.length);
  }
  return destination;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  removeBasePath
});
//# sourceMappingURL=removeBasePath.js.map