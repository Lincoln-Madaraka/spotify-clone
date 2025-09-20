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
var keyless_node_exports = {};
__export(keyless_node_exports, {
  createOrReadKeyless: () => createOrReadKeyless,
  removeKeyless: () => removeKeyless,
  safeParseClerkFile: () => safeParseClerkFile
});
module.exports = __toCommonJS(keyless_node_exports);
var import_createClerkClient = require("./createClerkClient");
var import_utils = require("./fs/utils");
var import_keyless_custom_headers = require("./keyless-custom-headers");
const CLERK_HIDDEN = ".clerk";
const CLERK_LOCK = "clerk.lock";
function updateGitignore() {
  const { existsSync, writeFileSync, readFileSync, appendFileSync } = (0, import_utils.nodeFsOrThrow)();
  const path = (0, import_utils.nodePathOrThrow)();
  const cwd = (0, import_utils.nodeCwdOrThrow)();
  const gitignorePath = path.join(cwd(), ".gitignore");
  if (!existsSync(gitignorePath)) {
    writeFileSync(gitignorePath, "");
  }
  const gitignoreContent = readFileSync(gitignorePath, "utf-8");
  const COMMENT = `# clerk configuration (can include secrets)`;
  if (!gitignoreContent.includes(CLERK_HIDDEN + "/")) {
    appendFileSync(gitignorePath, `
${COMMENT}
/${CLERK_HIDDEN}/
`);
  }
}
const generatePath = (...slugs) => {
  const path = (0, import_utils.nodePathOrThrow)();
  const cwd = (0, import_utils.nodeCwdOrThrow)();
  return path.join(cwd(), CLERK_HIDDEN, ...slugs);
};
const _TEMP_DIR_NAME = ".tmp";
const getKeylessConfigurationPath = () => generatePath(_TEMP_DIR_NAME, "keyless.json");
const getKeylessReadMePath = () => generatePath(_TEMP_DIR_NAME, "README.md");
let isCreatingFile = false;
function safeParseClerkFile() {
  const { readFileSync } = (0, import_utils.nodeFsOrThrow)();
  try {
    const CONFIG_PATH = getKeylessConfigurationPath();
    let fileAsString;
    try {
      fileAsString = readFileSync(CONFIG_PATH, { encoding: "utf-8" }) || "{}";
    } catch {
      fileAsString = "{}";
    }
    return JSON.parse(fileAsString);
  } catch {
    return void 0;
  }
}
const lockFileWriting = () => {
  const { writeFileSync } = (0, import_utils.nodeFsOrThrow)();
  isCreatingFile = true;
  writeFileSync(
    CLERK_LOCK,
    // In the rare case, the file persists give the developer enough context.
    "This file can be deleted. Please delete this file and refresh your application",
    {
      encoding: "utf8",
      mode: "0777",
      flag: "w"
    }
  );
};
const unlockFileWriting = () => {
  const { rmSync } = (0, import_utils.nodeFsOrThrow)();
  try {
    rmSync(CLERK_LOCK, { force: true, recursive: true });
  } catch {
  }
  isCreatingFile = false;
};
const isFileWritingLocked = () => {
  const { existsSync } = (0, import_utils.nodeFsOrThrow)();
  return isCreatingFile || existsSync(CLERK_LOCK);
};
async function createOrReadKeyless() {
  const { writeFileSync, mkdirSync } = (0, import_utils.nodeFsOrThrow)();
  if (isFileWritingLocked()) {
    return null;
  }
  lockFileWriting();
  const CONFIG_PATH = getKeylessConfigurationPath();
  const README_PATH = getKeylessReadMePath();
  mkdirSync(generatePath(_TEMP_DIR_NAME), { recursive: true });
  updateGitignore();
  const envVarsMap = safeParseClerkFile();
  if ((envVarsMap == null ? void 0 : envVarsMap.publishableKey) && (envVarsMap == null ? void 0 : envVarsMap.secretKey)) {
    unlockFileWriting();
    return envVarsMap;
  }
  const client = (0, import_createClerkClient.createClerkClientWithOptions)({});
  const keylessHeaders = await (0, import_keyless_custom_headers.collectKeylessMetadata)().then(import_keyless_custom_headers.formatMetadataHeaders).catch(() => new Headers());
  const accountlessApplication = await client.__experimental_accountlessApplications.createAccountlessApplication({ requestHeaders: keylessHeaders }).catch(() => null);
  if (accountlessApplication) {
    writeFileSync(CONFIG_PATH, JSON.stringify(accountlessApplication), {
      encoding: "utf8",
      mode: "0777",
      flag: "w"
    });
    const README_NOTIFICATION = `
## DO NOT COMMIT
This directory is auto-generated from \`@clerk/nextjs\` because you are running in Keyless mode. Avoid committing the \`.clerk/\` directory as it includes the secret key of the unclaimed instance.
  `;
    writeFileSync(README_PATH, README_NOTIFICATION, {
      encoding: "utf8",
      mode: "0777",
      flag: "w"
    });
  }
  unlockFileWriting();
  return accountlessApplication;
}
function removeKeyless() {
  const { rmSync } = (0, import_utils.nodeFsOrThrow)();
  if (isFileWritingLocked()) {
    return void 0;
  }
  lockFileWriting();
  try {
    rmSync(generatePath(), { force: true, recursive: true });
  } catch {
  }
  unlockFileWriting();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createOrReadKeyless,
  removeKeyless,
  safeParseClerkFile
});
//# sourceMappingURL=keyless-node.js.map