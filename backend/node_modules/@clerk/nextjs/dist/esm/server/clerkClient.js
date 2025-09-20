import "../chunk-BUSYA2B4.js";
import { constants } from "@clerk/backend/internal";
import { buildRequestLike, isPrerenderingBailout } from "../app-router/server/utils";
import { createClerkClientWithOptions } from "./createClerkClient";
import { getHeader } from "./headers-utils";
import { clerkMiddlewareRequestDataStorage } from "./middleware-storage";
import { decryptClerkRequestData } from "./utils";
const clerkClient = async () => {
  var _a, _b;
  let requestData;
  try {
    const request = await buildRequestLike();
    const encryptedRequestData = getHeader(request, constants.Headers.ClerkRequestData);
    requestData = decryptClerkRequestData(encryptedRequestData);
  } catch (err) {
    if (err && isPrerenderingBailout(err)) {
      throw err;
    }
  }
  const options = (_b = (_a = clerkMiddlewareRequestDataStorage.getStore()) == null ? void 0 : _a.get("requestData")) != null ? _b : requestData;
  if ((options == null ? void 0 : options.secretKey) || (options == null ? void 0 : options.publishableKey)) {
    return createClerkClientWithOptions(options);
  }
  return createClerkClientWithOptions({});
};
export {
  clerkClient
};
//# sourceMappingURL=clerkClient.js.map