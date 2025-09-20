import {
  __commonJS
} from "../../chunk-BUSYA2B4.js";
var require_safe_node_apis = __commonJS({
  "src/runtime/node/safe-node-apis.js"(exports, module) {
    const { existsSync, writeFileSync, readFileSync, appendFileSync, mkdirSync, rmSync } = require("node:fs");
    const path = require("node:path");
    const fs = {
      existsSync,
      writeFileSync,
      readFileSync,
      appendFileSync,
      mkdirSync,
      rmSync
    };
    const cwd = () => process.cwd();
    module.exports = { fs, path, cwd };
  }
});
export default require_safe_node_apis();
//# sourceMappingURL=safe-node-apis.js.map