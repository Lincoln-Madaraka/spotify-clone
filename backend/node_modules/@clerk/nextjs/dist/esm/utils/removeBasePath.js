import "../chunk-BUSYA2B4.js";
function removeBasePath(to) {
  let destination = to;
  const basePath = process.env.__NEXT_ROUTER_BASEPATH;
  if (basePath && destination.startsWith(basePath)) {
    destination = destination.slice(basePath.length);
  }
  return destination;
}
export {
  removeBasePath
};
//# sourceMappingURL=removeBasePath.js.map