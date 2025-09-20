import "../../chunk-BUSYA2B4.js";
import nodeRuntime from "#safe-node-apis";
function assertNotNullable(value, moduleName) {
  if (!value) {
    throw new Error(`Clerk: ${moduleName} is missing. This is an internal error. Please contact Clerk's support.`);
  }
}
const nodeFsOrThrow = () => {
  assertNotNullable(nodeRuntime.fs, "fs");
  return nodeRuntime.fs;
};
const nodePathOrThrow = () => {
  assertNotNullable(nodeRuntime.path, "path");
  return nodeRuntime.path;
};
const nodeCwdOrThrow = () => {
  assertNotNullable(nodeRuntime.cwd, "cwd");
  return nodeRuntime.cwd;
};
export {
  nodeCwdOrThrow,
  nodeFsOrThrow,
  nodePathOrThrow
};
//# sourceMappingURL=utils.js.map