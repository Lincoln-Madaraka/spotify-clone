import "../chunk-BUSYA2B4.js";
import { createPathMatcher } from "@clerk/shared/pathMatcher";
const createRouteMatcher = (routes) => {
  if (typeof routes === "function") {
    return (req) => routes(req);
  }
  const matcher = createPathMatcher(routes);
  return (req) => matcher(req.nextUrl.pathname);
};
export {
  createRouteMatcher
};
//# sourceMappingURL=routeMatcher.js.map