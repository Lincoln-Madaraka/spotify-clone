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
var controlComponents_exports = {};
__export(controlComponents_exports, {
  Protect: () => Protect,
  SignedIn: () => SignedIn,
  SignedOut: () => SignedOut
});
module.exports = __toCommonJS(controlComponents_exports);
var import_react = __toESM(require("react"));
var import_auth = require("./auth");
async function SignedIn(props) {
  const { children } = props;
  const { userId } = await (0, import_auth.auth)({ treatPendingAsSignedOut: props.treatPendingAsSignedOut });
  return userId ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children) : null;
}
async function SignedOut(props) {
  const { children } = props;
  const { userId } = await (0, import_auth.auth)({ treatPendingAsSignedOut: props.treatPendingAsSignedOut });
  return userId ? null : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children);
}
async function Protect(props) {
  const { children, fallback, ...restAuthorizedParams } = props;
  const { has, userId } = await (0, import_auth.auth)({ treatPendingAsSignedOut: props.treatPendingAsSignedOut });
  const unauthorized = fallback ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, fallback) : null;
  const authorized = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children);
  if (!userId) {
    return unauthorized;
  }
  if (typeof restAuthorizedParams.condition === "function") {
    return restAuthorizedParams.condition(has) ? authorized : unauthorized;
  }
  if (restAuthorizedParams.role || restAuthorizedParams.permission || restAuthorizedParams.feature || restAuthorizedParams.plan) {
    return has(restAuthorizedParams) ? authorized : unauthorized;
  }
  return authorized;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Protect,
  SignedIn,
  SignedOut
});
//# sourceMappingURL=controlComponents.js.map