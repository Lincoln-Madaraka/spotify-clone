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
var keyless_creator_reader_exports = {};
__export(keyless_creator_reader_exports, {
  KeylessCreatorOrReader: () => KeylessCreatorOrReader
});
module.exports = __toCommonJS(keyless_creator_reader_exports);
var import_navigation = require("next/navigation");
var import_react = __toESM(require("react"));
var import_keyless_actions = require("../keyless-actions");
const KeylessCreatorOrReader = (props) => {
  var _a;
  const { children } = props;
  const segments = (0, import_navigation.useSelectedLayoutSegments)();
  const isNotFoundRoute = ((_a = segments[0]) == null ? void 0 : _a.startsWith("/_not-found")) || false;
  const [state, fetchKeys] = import_react.default.useActionState(import_keyless_actions.createOrReadKeylessAction, null);
  (0, import_react.useEffect)(() => {
    if (isNotFoundRoute) {
      return;
    }
    import_react.default.startTransition(() => {
      fetchKeys();
    });
  }, [isNotFoundRoute]);
  if (!import_react.default.isValidElement(children)) {
    return children;
  }
  return import_react.default.cloneElement(children, {
    key: state == null ? void 0 : state.publishableKey,
    publishableKey: state == null ? void 0 : state.publishableKey,
    __internal_keyless_claimKeylessApplicationUrl: state == null ? void 0 : state.claimUrl,
    __internal_keyless_copyInstanceKeysUrl: state == null ? void 0 : state.apiKeysUrl,
    __internal_bypassMissingPublishableKey: true
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KeylessCreatorOrReader
});
//# sourceMappingURL=keyless-creator-reader.js.map