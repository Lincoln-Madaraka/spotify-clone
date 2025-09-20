import "../chunk-BUSYA2B4.js";
import { canUseKeyless } from "../utils/feature-flags";
import { createClerkClientWithOptions } from "./createClerkClient";
import { nodeFsOrThrow, nodePathOrThrow } from "./fs/utils";
const EVENT_KEYLESS_ENV_DRIFT_DETECTED = "KEYLESS_ENV_DRIFT_DETECTED";
const EVENT_SAMPLING_RATE = 1;
const TELEMETRY_FLAG_FILE = ".clerk/.tmp/telemetry.json";
function getTelemetryFlagFilePath() {
  const path = nodePathOrThrow();
  return path.join(process.cwd(), TELEMETRY_FLAG_FILE);
}
function tryMarkTelemetryEventAsFired() {
  try {
    if (canUseKeyless) {
      const { mkdirSync, writeFileSync } = nodeFsOrThrow();
      const path = nodePathOrThrow();
      const flagFilePath = getTelemetryFlagFilePath();
      const flagDirectory = path.dirname(flagFilePath);
      mkdirSync(flagDirectory, { recursive: true });
      const flagData = {
        firedAt: (/* @__PURE__ */ new Date()).toISOString(),
        event: EVENT_KEYLESS_ENV_DRIFT_DETECTED
      };
      writeFileSync(flagFilePath, JSON.stringify(flagData, null, 2), { flag: "wx" });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if ((error == null ? void 0 : error.code) === "EEXIST") {
      return false;
    }
    console.warn("Failed to create telemetry flag file:", error);
    return false;
  }
}
async function detectKeylessEnvDrift() {
  var _a, _b;
  if (!canUseKeyless) {
    return;
  }
  if (typeof window !== "undefined") {
    return;
  }
  try {
    const { safeParseClerkFile } = await import("./keyless-node.js");
    const keylessFile = safeParseClerkFile();
    if (!keylessFile) {
      return;
    }
    const envPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const envSecretKey = process.env.CLERK_SECRET_KEY;
    const hasEnvVars = Boolean(envPublishableKey || envSecretKey);
    const keylessFileHasKeys = Boolean((keylessFile == null ? void 0 : keylessFile.publishableKey) && (keylessFile == null ? void 0 : keylessFile.secretKey));
    const envVarsMissing = !envPublishableKey && !envSecretKey;
    if (!hasEnvVars && !keylessFileHasKeys) {
      return;
    }
    if (envVarsMissing && keylessFileHasKeys) {
      return;
    }
    if (!keylessFileHasKeys) {
      return;
    }
    if (!hasEnvVars) {
      return;
    }
    const publicKeyMatch = Boolean(
      envPublishableKey && keylessFile.publishableKey && envPublishableKey === keylessFile.publishableKey
    );
    const secretKeyMatch = Boolean(envSecretKey && keylessFile.secretKey && envSecretKey === keylessFile.secretKey);
    const hasActualDrift = envPublishableKey && keylessFile.publishableKey && !publicKeyMatch || envSecretKey && keylessFile.secretKey && !secretKeyMatch;
    if (!hasActualDrift) {
      return;
    }
    const payload = {
      publicKeyMatch,
      secretKeyMatch,
      envVarsMissing,
      keylessFileHasKeys,
      keylessPublishableKey: (_a = keylessFile.publishableKey) != null ? _a : "",
      envPublishableKey: envPublishableKey != null ? envPublishableKey : ""
    };
    const clerkClient = createClerkClientWithOptions({
      publishableKey: keylessFile.publishableKey,
      secretKey: keylessFile.secretKey,
      telemetry: {
        samplingRate: 1
      }
    });
    const shouldFireEvent = tryMarkTelemetryEventAsFired();
    if (shouldFireEvent) {
      const driftDetectedEvent = {
        event: EVENT_KEYLESS_ENV_DRIFT_DETECTED,
        eventSamplingRate: EVENT_SAMPLING_RATE,
        payload
      };
      (_b = clerkClient.telemetry) == null ? void 0 : _b.record(driftDetectedEvent);
    }
  } catch (error) {
    console.warn("Failed to detect keyless environment drift:", error);
  }
}
export {
  detectKeylessEnvDrift
};
//# sourceMappingURL=keyless-telemetry.js.map