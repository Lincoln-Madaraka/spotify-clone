"use strict";
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
var clerk_js_script_exports = {};
__export(clerk_js_script_exports, {
  ClerkJSScript: () => ClerkJSScript
});
module.exports = __toCommonJS(clerk_js_script_exports);
var import_clerk_react = require("@clerk/clerk-react");
var import_internal = require("@clerk/clerk-react/internal");
var import_script = __toESM(require("next/script"));
var import_react = __toESM(require("react"));
var import_NextOptionsContext = require("../client-boundary/NextOptionsContext");
function ClerkJSScript(props) {
  const { publishableKey, clerkJSUrl, clerkJSVersion, clerkJSVariant, nonce } = (0, import_NextOptionsContext.useClerkNextOptions)();
  const { domain, proxyUrl } = (0, import_clerk_react.useClerk)();
  if (!publishableKey) {
    return null;
  }
  const options = {
    domain,
    proxyUrl,
    publishableKey,
    clerkJSUrl,
    clerkJSVersion,
    clerkJSVariant,
    nonce
  };
  const scriptUrl = (0, import_internal.clerkJsScriptUrl)(options);
  const Script = props.router === "app" ? "script" : import_script.default;
  return /* @__PURE__ */ import_react.default.createElement(
    Script,
    {
      src: scriptUrl,
      "data-clerk-js-script": true,
      async: true,
      defer: props.router === "pages" ? false : void 0,
      crossOrigin: "anonymous",
      strategy: props.router === "pages" ? "beforeInteractive" : void 0,
      ...(0, import_internal.buildClerkJsScriptAttributes)(options)
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClerkJSScript
});
//# sourceMappingURL=clerk-js-script.js.map