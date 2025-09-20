import "../../chunk-BUSYA2B4.js";
import { nodeCwdOrThrow, nodeFsOrThrow, nodePathOrThrow } from "./utils";
function hasSrcAppDir() {
  const { existsSync } = nodeFsOrThrow();
  const path = nodePathOrThrow();
  const cwd = nodeCwdOrThrow();
  const projectWithAppSrc = path.join(cwd(), "src", "app");
  return !!existsSync(projectWithAppSrc);
}
function suggestMiddlewareLocation() {
  const fileExtensions = ["ts", "js"];
  const suggestionMessage = (extension, to, from) => `Clerk: clerkMiddleware() was not run, your middleware file might be misplaced. Move your middleware file to ./${to}middleware.${extension}. Currently located at ./${from}middleware.${extension}`;
  const { existsSync } = nodeFsOrThrow();
  const path = nodePathOrThrow();
  const cwd = nodeCwdOrThrow();
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
export {
  hasSrcAppDir,
  suggestMiddlewareLocation
};
//# sourceMappingURL=middleware-location.js.map