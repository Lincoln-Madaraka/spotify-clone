import "../chunk-BUSYA2B4.js";
const invalidateNextRouterCache = () => {
  if (typeof window === "undefined") {
    return;
  }
  const invalidate = (cache) => {
    Object.keys(cache).forEach((key) => {
      delete cache[key];
    });
  };
  try {
    invalidate(window.next.router.sdc);
    invalidate(window.next.router.sbc);
  } catch {
    return;
  }
};
export {
  invalidateNextRouterCache
};
//# sourceMappingURL=invalidateNextRouterCache.js.map