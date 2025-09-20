"use strict";
"use client";
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
var useAwaitableReplace_exports = {};
__export(useAwaitableReplace_exports, {
  useAwaitableReplace: () => useAwaitableReplace
});
module.exports = __toCommonJS(useAwaitableReplace_exports);
var import_navigation = require("next/navigation");
var import_useInternalNavFun = require("./useInternalNavFun");
const useAwaitableReplace = () => {
  const router = (0, import_navigation.useRouter)();
  return (0, import_useInternalNavFun.useInternalNavFun)({
    windowNav: typeof window !== "undefined" ? window.history.replaceState.bind(window.history) : void 0,
    routerNav: router.replace.bind(router),
    name: "replace"
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAwaitableReplace
});
//# sourceMappingURL=useAwaitableReplace.js.map