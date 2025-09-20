import "../chunk-BUSYA2B4.js";
import { createClerkClientWithOptions } from "./createClerkClient";
import { nodeCwdOrThrow, nodeFsOrThrow, nodePathOrThrow } from "./fs/utils";
import { collectKeylessMetadata, formatMetadataHeaders } from "./keyless-custom-headers";
const CLERK_HIDDEN = ".clerk";
const CLERK_LOCK = "clerk.lock";
function updateGitignore() {
  const { existsSync, writeFileSync, readFileSync, appendFileSync } = nodeFsOrThrow();
  const path = nodePathOrThrow();
  const cwd = nodeCwdOrThrow();
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
  const path = nodePathOrThrow();
  const cwd = nodeCwdOrThrow();
  return path.join(cwd(), CLERK_HIDDEN, ...slugs);
};
const _TEMP_DIR_NAME = ".tmp";
const getKeylessConfigurationPath = () => generatePath(_TEMP_DIR_NAME, "keyless.json");
const getKeylessReadMePath = () => generatePath(_TEMP_DIR_NAME, "README.md");
let isCreatingFile = false;
function safeParseClerkFile() {
  const { readFileSync } = nodeFsOrThrow();
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
  const { writeFileSync } = nodeFsOrThrow();
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
  const { rmSync } = nodeFsOrThrow();
  try {
    rmSync(CLERK_LOCK, { force: true, recursive: true });
  } catch {
  }
  isCreatingFile = false;
};
const isFileWritingLocked = () => {
  const { existsSync } = nodeFsOrThrow();
  return isCreatingFile || existsSync(CLERK_LOCK);
};
async function createOrReadKeyless() {
  const { writeFileSync, mkdirSync } = nodeFsOrThrow();
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
  const client = createClerkClientWithOptions({});
  const keylessHeaders = await collectKeylessMetadata().then(formatMetadataHeaders).catch(() => new Headers());
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
  const { rmSync } = nodeFsOrThrow();
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
export {
  createOrReadKeyless,
  removeKeyless,
  safeParseClerkFile
};
//# sourceMappingURL=keyless-node.js.map