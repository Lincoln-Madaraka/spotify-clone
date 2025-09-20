"use strict";
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
//# sourceMappingURL=safe-node-apis.js.map