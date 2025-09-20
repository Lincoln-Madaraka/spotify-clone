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
var buildClerkProps_exports = {};
__export(buildClerkProps_exports, {
  buildClerkProps: () => buildClerkProps,
  getDynamicAuthData: () => getDynamicAuthData
});
module.exports = __toCommonJS(buildClerkProps_exports);
var import_internal = require("@clerk/backend/internal");
var import_getAuthDataFromRequest = require("./data/getAuthDataFromRequest");
const buildClerkProps = (req, initialState = {}) => {
  const sanitizedAuthObject = getDynamicAuthData(req, initialState);
  const __clerk_ssr_state = process.env.NODE_ENV !== "production" ? JSON.parse(JSON.stringify(sanitizedAuthObject)) : sanitizedAuthObject;
  return { __clerk_ssr_state };
};
function getDynamicAuthData(req, initialState = {}) {
  const authObject = (0, import_getAuthDataFromRequest.getAuthDataFromRequest)(req);
  return (0, import_internal.makeAuthObjectSerializable)((0, import_internal.stripPrivateDataFromObject)({ ...authObject, ...initialState }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildClerkProps,
  getDynamicAuthData
});
//# sourceMappingURL=buildClerkProps.js.map