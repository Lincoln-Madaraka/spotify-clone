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
var keyless_cookie_sync_exports = {};
__export(keyless_cookie_sync_exports, {
  KeylessCookieSync: () => KeylessCookieSync
});
module.exports = __toCommonJS(keyless_cookie_sync_exports);
var import_navigation = require("next/navigation");
var import_react = require("react");
var import_feature_flags = require("../../utils/feature-flags");
function KeylessCookieSync(props) {
  var _a;
  const segments = (0, import_navigation.useSelectedLayoutSegments)();
  const isNotFoundRoute = ((_a = segments[0]) == null ? void 0 : _a.startsWith("/_not-found")) || false;
  (0, import_react.useEffect)(() => {
    if (import_feature_flags.canUseKeyless && !isNotFoundRoute) {
      void import("../keyless-actions.js").then(
        (m) => m.syncKeylessConfigAction({
          ...props,
          // Preserve the current url and return back, once keys are synced in the middleware
          returnUrl: window.location.href
        })
      );
    }
  }, [isNotFoundRoute]);
  return props.children;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KeylessCookieSync
});
//# sourceMappingURL=keyless-cookie-sync.js.map