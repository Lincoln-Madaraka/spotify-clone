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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var webhooks_exports = {};
__export(webhooks_exports, {
  verifyWebhook: () => verifyWebhook
});
module.exports = __toCommonJS(webhooks_exports);
var import_webhooks = require("@clerk/backend/webhooks");
var import_headers_utils = require("./server/headers-utils");
__reExport(webhooks_exports, require("@clerk/backend/webhooks"), module.exports);
const SVIX_ID_HEADER = "svix-id";
const SVIX_TIMESTAMP_HEADER = "svix-timestamp";
const SVIX_SIGNATURE_HEADER = "svix-signature";
async function verifyWebhook(request, options) {
  if ((0, import_headers_utils.isNextRequest)(request) || (0, import_headers_utils.isRequestWebAPI)(request)) {
    return (0, import_webhooks.verifyWebhook)(request, options);
  }
  const webRequest = nextApiRequestToWebRequest(request);
  return (0, import_webhooks.verifyWebhook)(webRequest, options);
}
function nextApiRequestToWebRequest(req) {
  const headers = new Headers();
  const svixId = (0, import_headers_utils.getHeader)(req, SVIX_ID_HEADER) || "";
  const svixTimestamp = (0, import_headers_utils.getHeader)(req, SVIX_TIMESTAMP_HEADER) || "";
  const svixSignature = (0, import_headers_utils.getHeader)(req, SVIX_SIGNATURE_HEADER) || "";
  headers.set(SVIX_ID_HEADER, svixId);
  headers.set(SVIX_TIMESTAMP_HEADER, svixTimestamp);
  headers.set(SVIX_SIGNATURE_HEADER, svixSignature);
  const protocol = (0, import_headers_utils.getHeader)(req, "x-forwarded-proto") || "http";
  const host = (0, import_headers_utils.getHeader)(req, "x-forwarded-host") || "clerk-dummy";
  const dummyOriginReqUrl = new URL(req.url || "", `${protocol}://${host}`);
  const body = "body" in req && req.body ? JSON.stringify(req.body) : void 0;
  return new Request(dummyOriginReqUrl, {
    method: req.method,
    headers,
    body
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  verifyWebhook,
  ...require("@clerk/backend/webhooks")
});
//# sourceMappingURL=webhooks.js.map