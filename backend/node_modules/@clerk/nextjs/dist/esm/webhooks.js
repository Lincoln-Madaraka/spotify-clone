import "./chunk-BUSYA2B4.js";
import { verifyWebhook as verifyWebhookBase } from "@clerk/backend/webhooks";
import { getHeader, isNextRequest, isRequestWebAPI } from "./server/headers-utils";
export * from "@clerk/backend/webhooks";
const SVIX_ID_HEADER = "svix-id";
const SVIX_TIMESTAMP_HEADER = "svix-timestamp";
const SVIX_SIGNATURE_HEADER = "svix-signature";
async function verifyWebhook(request, options) {
  if (isNextRequest(request) || isRequestWebAPI(request)) {
    return verifyWebhookBase(request, options);
  }
  const webRequest = nextApiRequestToWebRequest(request);
  return verifyWebhookBase(webRequest, options);
}
function nextApiRequestToWebRequest(req) {
  const headers = new Headers();
  const svixId = getHeader(req, SVIX_ID_HEADER) || "";
  const svixTimestamp = getHeader(req, SVIX_TIMESTAMP_HEADER) || "";
  const svixSignature = getHeader(req, SVIX_SIGNATURE_HEADER) || "";
  headers.set(SVIX_ID_HEADER, svixId);
  headers.set(SVIX_TIMESTAMP_HEADER, svixTimestamp);
  headers.set(SVIX_SIGNATURE_HEADER, svixSignature);
  const protocol = getHeader(req, "x-forwarded-proto") || "http";
  const host = getHeader(req, "x-forwarded-host") || "clerk-dummy";
  const dummyOriginReqUrl = new URL(req.url || "", `${protocol}://${host}`);
  const body = "body" in req && req.body ? JSON.stringify(req.body) : void 0;
  return new Request(dummyOriginReqUrl, {
    method: req.method,
    headers,
    body
  });
}
export {
  verifyWebhook
};
//# sourceMappingURL=webhooks.js.map