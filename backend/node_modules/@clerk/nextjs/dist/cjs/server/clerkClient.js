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
var clerkClient_exports = {};
__export(clerkClient_exports, {
  clerkClient: () => clerkClient
});
module.exports = __toCommonJS(clerkClient_exports);
var import_internal = require("@clerk/backend/internal");
var import_utils = require("../app-router/server/utils");
var import_createClerkClient = require("./createClerkClient");
var import_headers_utils = require("./headers-utils");
var import_middleware_storage = require("./middleware-storage");
var import_utils2 = require("./utils");
const clerkClient = async () => {
  var _a, _b;
  let requestData;
  try {
    const request = await (0, import_utils.buildRequestLike)();
    const encryptedRequestData = (0, import_headers_utils.getHeader)(request, import_internal.constants.Headers.ClerkRequestData);
    requestData = (0, import_utils2.decryptClerkRequestData)(encryptedRequestData);
  } catch (err) {
    if (err && (0, import_utils.isPrerenderingBailout)(err)) {
      throw err;
    }
  }
  const options = (_b = (_a = import_middleware_storage.clerkMiddlewareRequestDataStorage.getStore()) == null ? void 0 : _a.get("requestData")) != null ? _b : requestData;
  if ((options == null ? void 0 : options.secretKey) || (options == null ? void 0 : options.publishableKey)) {
    return (0, import_createClerkClient.createClerkClientWithOptions)(options);
  }
  return (0, import_createClerkClient.createClerkClientWithOptions)({});
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clerkClient
});
//# sourceMappingURL=clerkClient.js.map