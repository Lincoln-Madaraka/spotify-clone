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
var router_telemetry_exports = {};
__export(router_telemetry_exports, {
  RouterTelemetry: () => RouterTelemetry
});
module.exports = __toCommonJS(router_telemetry_exports);
var import_telemetry = require("@clerk/shared/telemetry");
var import_hooks = require("../client-boundary/hooks");
var import_usePagesRouter = require("../client-boundary/hooks/usePagesRouter");
const RouterTelemetry = () => {
  var _a, _b;
  const clerk = (0, import_hooks.useClerk)();
  const { pagesRouter } = (0, import_usePagesRouter.usePagesRouter)();
  (_b = clerk.telemetry) == null ? void 0 : _b.record(
    (0, import_telemetry.eventFrameworkMetadata)({
      router: pagesRouter ? "pages" : "app",
      ...((_a = globalThis == null ? void 0 : globalThis.next) == null ? void 0 : _a.version) ? { nextjsVersion: globalThis.next.version } : {}
    })
  );
  return null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RouterTelemetry
});
//# sourceMappingURL=router-telemetry.js.map