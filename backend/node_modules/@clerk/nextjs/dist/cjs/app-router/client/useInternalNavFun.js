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
var useInternalNavFun_exports = {};
__export(useInternalNavFun_exports, {
  useInternalNavFun: () => useInternalNavFun
});
module.exports = __toCommonJS(useInternalNavFun_exports);
var import_navigation = require("next/navigation");
var import_react = require("react");
var import_removeBasePath = require("../../utils/removeBasePath");
const getClerkNavigationObject = (name) => {
  var _a, _b, _c;
  (_a = window.__clerk_internal_navigations) != null ? _a : window.__clerk_internal_navigations = {};
  (_c = (_b = window.__clerk_internal_navigations)[name]) != null ? _c : _b[name] = {};
  return window.__clerk_internal_navigations[name];
};
const useInternalNavFun = (props) => {
  const { windowNav, routerNav, name } = props;
  const pathname = (0, import_navigation.usePathname)();
  const [isPending, startTransition] = (0, import_react.useTransition)();
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
            routerNav((0, import_removeBasePath.removeBasePath)(to));
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
  (0, import_react.useEffect)(() => {
    flushPromises();
    return flushPromises;
  }, []);
  (0, import_react.useEffect)(() => {
    if (!isPending) {
      flushPromises();
    }
  }, [pathname, isPending]);
  return (0, import_react.useCallback)((to, metadata) => {
    return getClerkNavigationObject(name).fun(to, metadata);
  }, []);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useInternalNavFun
});
//# sourceMappingURL=useInternalNavFun.js.map