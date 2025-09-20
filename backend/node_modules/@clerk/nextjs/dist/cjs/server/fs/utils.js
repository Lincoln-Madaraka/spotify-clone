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
var utils_exports = {};
__export(utils_exports, {
  nodeCwdOrThrow: () => nodeCwdOrThrow,
  nodeFsOrThrow: () => nodeFsOrThrow,
  nodePathOrThrow: () => nodePathOrThrow
});
module.exports = __toCommonJS(utils_exports);
var import_safe_node_apis = __toESM(require("#safe-node-apis"));
function assertNotNullable(value, moduleName) {
  if (!value) {
    throw new Error(`Clerk: ${moduleName} is missing. This is an internal error. Please contact Clerk's support.`);
  }
}
const nodeFsOrThrow = () => {
  assertNotNullable(import_safe_node_apis.default.fs, "fs");
  return import_safe_node_apis.default.fs;
};
const nodePathOrThrow = () => {
  assertNotNullable(import_safe_node_apis.default.path, "path");
  return import_safe_node_apis.default.path;
};
const nodeCwdOrThrow = () => {
  assertNotNullable(import_safe_node_apis.default.cwd, "cwd");
  return import_safe_node_apis.default.cwd;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  nodeCwdOrThrow,
  nodeFsOrThrow,
  nodePathOrThrow
});
//# sourceMappingURL=utils.js.map