import "../../chunk-BUSYA2B4.js";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useTransition } from "react";
import { removeBasePath } from "../../utils/removeBasePath";
const getClerkNavigationObject = (name) => {
  var _a, _b, _c;
  (_a = window.__clerk_internal_navigations) != null ? _a : window.__clerk_internal_navigations = {};
  (_c = (_b = window.__clerk_internal_navigations)[name]) != null ? _c : _b[name] = {};
  return window.__clerk_internal_navigations[name];
};
const useInternalNavFun = (props) => {
  const { windowNav, routerNav, name } = props;
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  if (windowNav) {
    getClerkNavigationObject(name).fun = (to, opts) => {
      return new Promise((res) => {
        var _a, _b, _c;
        (_b = (_a = getClerkNavigationObject(name)).promisesBuffer) != null ? _b : _a.promisesBuffer = [];
        (_c = getClerkNavigationObject(name).promisesBuffer) == null ? void 0 : _c.push(res);
        startTransition(() => {
          var _a2, _b2, _c2;
          if (((_a2 = opts == null ? void 0 : opts.__internal_metadata) == null ? void 0 : _a2.navigationType) === "internal") {
            const state = ((_c2 = (_b2 = window.next) == null ? void 0 : _b2.version) != null ? _c2 : "") < "14.1.0" ? history.state : null;
            windowNav(state, "", to);
          } else {
            routerNav(removeBasePath(to));
          }
        });
      });
    };
  }
  const flushPromises = () => {
    var _a;
    (_a = getClerkNavigationObject(name).promisesBuffer) == null ? void 0 : _a.forEach((resolve) => resolve());
    getClerkNavigationObject(name).promisesBuffer = [];
  };
  useEffect(() => {
    flushPromises();
    return flushPromises;
  }, []);
  useEffect(() => {
    if (!isPending) {
      flushPromises();
    }
  }, [pathname, isPending]);
  return useCallback((to, metadata) => {
    return getClerkNavigationObject(name).fun(to, metadata);
  }, []);
};
export {
  useInternalNavFun
};
//# sourceMappingURL=useInternalNavFun.js.map