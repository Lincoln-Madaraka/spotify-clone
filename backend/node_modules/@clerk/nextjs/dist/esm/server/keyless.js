import "../chunk-BUSYA2B4.js";
import { canUseKeyless } from "../utils/feature-flags";
const keylessCookiePrefix = `__clerk_keys_`;
async function hashString(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex.slice(0, 16);
}
async function getKeylessCookieName() {
  const PATH = process.env.PWD;
  if (!PATH) {
    return `${keylessCookiePrefix}${0}`;
  }
  const lastThreeDirs = PATH.split("/").filter(Boolean).slice(-3).reverse().join("/");
  const hash = await hashString(lastThreeDirs);
  return `${keylessCookiePrefix}${hash}`;
}
async function getKeylessCookieValue(getter) {
  if (!canUseKeyless) {
    return void 0;
  }
  const keylessCookieName = await getKeylessCookieName();
  let keyless;
  try {
    if (keylessCookieName) {
      keyless = JSON.parse(getter(keylessCookieName) || "{}");
    }
  } catch {
    keyless = void 0;
  }
  return keyless;
}
export {
  getKeylessCookieName,
  getKeylessCookieValue
};
//# sourceMappingURL=keyless.js.map