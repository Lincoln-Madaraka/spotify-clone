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
var keyless_telemetry_exports = {};
__export(keyless_telemetry_exports, {
  detectKeylessEnvDrift: () => detectKeylessEnvDrift
});
module.exports = __toCommonJS(keyless_telemetry_exports);
var import_feature_flags = require("../utils/feature-flags");
var import_createClerkClient = require("./createClerkClient");
var import_utils = require("./fs/utils");
const EVENT_KEYLESS_ENV_DRIFT_DETECTED = "KEYLESS_ENV_DRIFT_DETECTED";
const EVENT_SAMPLING_RATE = 1;
const TELEMETRY_FLAG_FILE = ".clerk/.tmp/telemetry.json";
function getTelemetryFlagFilePath() {
  const path = (0, import_utils.nodePathOrThrow)();
  return path.join(process.cwd(), TELEMETRY_FLAG_FILE);
}
function tryMarkTelemetryEventAsFired() {
  try {
    if (import_feature_flags.canUseKeyless) {
      const { mkdirSync, writeFileSync } = (0, import_utils.nodeFsOrThrow)();
      const path = (0, import_utils.nodePathOrThrow)();
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
  if (!import_feature_flags.canUseKeyless) {
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
    const clerkClient = (0, import_createClerkClient.createClerkClientWithOptions)({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  detectKeylessEnvDrift
});
//# sourceMappingURL=keyless-telemetry.js.map