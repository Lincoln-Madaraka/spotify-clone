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
var middleware_location_exports = {};
__export(middleware_location_exports, {
  hasSrcAppDir: () => hasSrcAppDir,
  suggestMiddlewareLocation: () => suggestMiddlewareLocation
});
module.exports = __toCommonJS(middleware_location_exports);
var import_utils = require("./utils");
function hasSrcAppDir() {
  const { existsSync } = (0, import_utils.nodeFsOrThrow)();
  const path = (0, import_utils.nodePathOrThrow)();
  const cwd = (0, import_utils.nodeCwdOrThrow)();
  const projectWithAppSrc = path.join(cwd(), "src", "app");
  return !!existsSync(projectWithAppSrc);
}
function suggestMiddlewareLocation() {
  const fileExtensions = ["ts", "js"];
  const suggestionMessage = (extension, to, from) => `Clerk: clerkMiddleware() was not run, your middleware file might be misplaced. Move your middleware file to ./${to}middleware.${extension}. Currently located at ./${from}middleware.${extension}`;
  const { existsSync } = (0, import_utils.nodeFsOrThrow)();
  const path = (0, import_utils.nodePathOrThrow)();
  const cwd = (0, import_utils.nodeCwdOrThrow)();
  const projectWithAppSrcPath = path.join(cwd(), "src", "app");
  const projectWithAppPath = path.join(cwd(), "app");
  const checkMiddlewareLocation = (basePath, to, from) => {
    for (const fileExtension of fileExtensions) {
      if (existsSync(path.join(basePath, `middleware.${fileExtension}`))) {
        return suggestionMessage(fileExtension, to, from);
      }
    }
    return void 0;
  };
  if (existsSync(projectWithAppSrcPath)) {
    return checkMiddlewareLocation(projectWithAppSrcPath, "src/", "src/app/") || checkMiddlewareLocation(cwd(), "src/", "");
  }
  if (existsSync(projectWithAppPath)) {
    return checkMiddlewareLocation(projectWithAppPath, "", "app/");
  }
  return void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hasSrcAppDir,
  suggestMiddlewareLocation
});
//# sourceMappingURL=middleware-location.js.map