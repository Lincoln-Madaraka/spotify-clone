"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var PromisifiedAuthProvider_exports = {};
__export(PromisifiedAuthProvider_exports, {
  PromisifiedAuthProvider: () => PromisifiedAuthProvider,
  usePromisifiedAuth: () => usePromisifiedAuth
});
module.exports = __toCommonJS(PromisifiedAuthProvider_exports);
var import_clerk_react = require("@clerk/clerk-react");
var import_internal = require("@clerk/clerk-react/internal");
var import_router = require("next/compat/router");
var import_react = __toESM(require("react"));
const PromisifiedAuthContext = import_react.default.createContext(null);
function PromisifiedAuthProvider({
  authPromise,
  children
}) {
  return /* @__PURE__ */ import_react.default.createElement(PromisifiedAuthContext.Provider, { value: authPromise }, children);
}
function usePromisifiedAuth(options = {}) {
  const isPagesRouter = (0, import_router.useRouter)();
  const valueFromContext = import_react.default.useContext(PromisifiedAuthContext);
  let resolvedData = valueFromContext;
  if (valueFromContext && "then" in valueFromContext) {
    resolvedData = import_react.default.use(valueFromContext);
  }
  if (typeof window === "undefined") {
    if (isPagesRouter) {
      return (0, import_clerk_react.useAuth)(options);
    }
    return (0, import_internal.useDerivedAuth)({ ...resolvedData, ...options });
  } else {
    return (0, import_clerk_react.useAuth)({ ...resolvedData, ...options });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PromisifiedAuthProvider,
  usePromisifiedAuth
});
//# sourceMappingURL=PromisifiedAuthProvider.js.map