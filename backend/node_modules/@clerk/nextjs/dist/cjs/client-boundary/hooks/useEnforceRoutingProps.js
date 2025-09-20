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
var useEnforceRoutingProps_exports = {};
__export(useEnforceRoutingProps_exports, {
  useEnforceCorrectRoutingProps: () => useEnforceCorrectRoutingProps
});
module.exports = __toCommonJS(useEnforceRoutingProps_exports);
var import_internal = require("@clerk/clerk-react/internal");
var import_useEnforceCatchAllRoute = require("./useEnforceCatchAllRoute");
var import_usePathnameWithoutCatchAll = require("./usePathnameWithoutCatchAll");
function useEnforceCorrectRoutingProps(componentName, props, requireSessionBeforeCheck = true) {
  const path = (0, import_usePathnameWithoutCatchAll.usePathnameWithoutCatchAll)();
  const routingProps = (0, import_internal.useRoutingProps)(componentName, props, { path });
  (0, import_useEnforceCatchAllRoute.useEnforceCatchAllRoute)(componentName, path, routingProps.routing, requireSessionBeforeCheck);
  return routingProps;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useEnforceCorrectRoutingProps
});
//# sourceMappingURL=useEnforceRoutingProps.js.map