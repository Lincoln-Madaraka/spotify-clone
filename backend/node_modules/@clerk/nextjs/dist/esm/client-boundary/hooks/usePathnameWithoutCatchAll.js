import "../../chunk-BUSYA2B4.js";
import React from "react";
import { usePagesRouter } from "./usePagesRouter";
const usePathnameWithoutCatchAll = () => {
  const pathRef = React.useRef();
  const { pagesRouter } = usePagesRouter();
  if (pagesRouter) {
    if (pathRef.current) {
      return pathRef.current;
    } else {
      pathRef.current = pagesRouter.pathname.replace(/\/\[\[\.\.\..*/, "");
      return pathRef.current;
    }
  }
  const usePathname = require("next/navigation").usePathname;
  const useParams = require("next/navigation").useParams;
  const pathname = usePathname() || "";
  const pathParts = pathname.split("/").filter(Boolean);
  const catchAllParams = Object.values(useParams() || {}).filter((v) => Array.isArray(v)).flat(Infinity);
  if (pathRef.current) {
    return pathRef.current;
  } else {
    pathRef.current = `/${pathParts.slice(0, pathParts.length - catchAllParams.length).join("/")}`;
    return pathRef.current;
  }
};
export {
  usePathnameWithoutCatchAll
};
//# sourceMappingURL=usePathnameWithoutCatchAll.js.map