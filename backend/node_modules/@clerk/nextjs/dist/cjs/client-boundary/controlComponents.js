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
var controlComponents_exports = {};
__export(controlComponents_exports, {
  AuthenticateWithRedirectCallback: () => import_clerk_react.AuthenticateWithRedirectCallback,
  ClerkDegraded: () => import_clerk_react.ClerkDegraded,
  ClerkFailed: () => import_clerk_react.ClerkFailed,
  ClerkLoaded: () => import_clerk_react.ClerkLoaded,
  ClerkLoading: () => import_clerk_react.ClerkLoading,
  MultisessionAppSupport: () => import_internal.MultisessionAppSupport,
  Protect: () => import_clerk_react.Protect,
  RedirectToCreateOrganization: () => import_clerk_react.RedirectToCreateOrganization,
  RedirectToOrganizationProfile: () => import_clerk_react.RedirectToOrganizationProfile,
  RedirectToSignIn: () => import_clerk_react.RedirectToSignIn,
  RedirectToSignUp: () => import_clerk_react.RedirectToSignUp,
  RedirectToTasks: () => import_clerk_react.RedirectToTasks,
  RedirectToUserProfile: () => import_clerk_react.RedirectToUserProfile,
  SignedIn: () => import_clerk_react.SignedIn,
  SignedOut: () => import_clerk_react.SignedOut
});
module.exports = __toCommonJS(controlComponents_exports);
var import_clerk_react = require("@clerk/clerk-react");
var import_internal = require("@clerk/clerk-react/internal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateWithRedirectCallback,
  ClerkDegraded,
  ClerkFailed,
  ClerkLoaded,
  ClerkLoading,
  MultisessionAppSupport,
  Protect,
  RedirectToCreateOrganization,
  RedirectToOrganizationProfile,
  RedirectToSignIn,
  RedirectToSignUp,
  RedirectToTasks,
  RedirectToUserProfile,
  SignedIn,
  SignedOut
});
//# sourceMappingURL=controlComponents.js.map