"use server";
import { cookies, headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { errorThrower } from "../server/errorThrower";
import { detectClerkMiddleware } from "../server/headers-utils";
import { getKeylessCookieName, getKeylessCookieValue } from "../server/keyless";
import { canUseKeyless } from "../utils/feature-flags";
const keylessCookieConfig = {
  secure: false,
  httpOnly: false,
  sameSite: "lax"
};
async function syncKeylessConfigAction(args) {
  const { claimUrl, publishableKey, secretKey, returnUrl } = args;
  const cookieStore = await cookies();
  const request = new Request("https://placeholder.com", { headers: await headers() });
  const keyless = await getKeylessCookieValue((name) => {
    var _a;
    return (_a = cookieStore.get(name)) == null ? void 0 : _a.value;
  });
  const pksMatch = (keyless == null ? void 0 : keyless.publishableKey) === publishableKey;
  const sksMatch = (keyless == null ? void 0 : keyless.secretKey) === secretKey;
  if (pksMatch && sksMatch) {
    return;
  }
  cookieStore.set(
    await getKeylessCookieName(),
    JSON.stringify({ claimUrl, publishableKey, secretKey }),
    keylessCookieConfig
  );
  if (detectClerkMiddleware(request)) {
    redirect(`/clerk-sync-keyless?returnUrl=${returnUrl}`, RedirectType.replace);
    return;
  }
  return;
}
async function createOrReadKeylessAction() {
  if (!canUseKeyless) {
    return null;
  }
  const result = await import("../server/keyless-node.js").then((m) => m.createOrReadKeyless()).catch(() => null);
  if (!result) {
    errorThrower.throwMissingPublishableKeyError();
    return null;
  }
  const { clerkDevelopmentCache, createKeylessModeMessage } = await import("../server/keyless-log-cache.js");
  clerkDevelopmentCache == null ? void 0 : clerkDevelopmentCache.log({
    cacheKey: result.publishableKey,
    msg: createKeylessModeMessage(result)
  });
  const { claimUrl, publishableKey, secretKey, apiKeysUrl } = result;
  void (await cookies()).set(
    await getKeylessCookieName(),
    JSON.stringify({ claimUrl, publishableKey, secretKey }),
    keylessCookieConfig
  );
  return {
    claimUrl,
    publishableKey,
    apiKeysUrl
  };
}
async function deleteKeylessAction() {
  if (!canUseKeyless) {
    return;
  }
  await import("../server/keyless-node.js").then((m) => m.removeKeyless()).catch(() => {
  });
  return;
}
async function detectKeylessEnvDriftAction() {
  if (!canUseKeyless) {
    return;
  }
  try {
    const { detectKeylessEnvDrift } = await import("../server/keyless-telemetry.js");
    await detectKeylessEnvDrift();
  } catch {
  }
}
export {
  createOrReadKeylessAction,
  deleteKeylessAction,
  detectKeylessEnvDriftAction,
  syncKeylessConfigAction
};
