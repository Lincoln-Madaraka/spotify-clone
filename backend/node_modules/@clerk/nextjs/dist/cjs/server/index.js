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
var server_exports = {};
__export(server_exports, {
  auth: () => import_auth.auth,
  buildClerkProps: () => import_buildClerkProps.buildClerkProps,
  clerkClient: () => import_clerkClient.clerkClient,
  clerkMiddleware: () => import_clerkMiddleware.clerkMiddleware,
  createClerkClient: () => import_backend.createClerkClient,
  createRouteMatcher: () => import_routeMatcher.createRouteMatcher,
  currentUser: () => import_currentUser.currentUser,
  getAuth: () => import_createGetAuth.getAuth,
  reverificationError: () => import_internal.reverificationError,
  reverificationErrorResponse: () => import_internal.reverificationErrorResponse,
  verifyToken: () => import_backend.verifyToken
});
module.exports = __toCommonJS(server_exports);
var import_routeMatcher = require("./routeMatcher");
var import_backend = require("@clerk/backend");
var import_clerkClient = require("./clerkClient");
var import_createGetAuth = require("./createGetAuth");
var import_buildClerkProps = require("./buildClerkProps");
var import_auth = require("../app-router/server/auth");
var import_currentUser = require("../app-router/server/currentUser");
var import_clerkMiddleware = require("./clerkMiddleware");
var import_internal = require("@clerk/backend/internal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth,
  buildClerkProps,
  clerkClient,
  clerkMiddleware,
  createClerkClient,
  createRouteMatcher,
  currentUser,
  getAuth,
  reverificationError,
  reverificationErrorResponse,
  verifyToken
});
//# sourceMappingURL=index.js.map