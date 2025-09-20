"use client";
import "../chunk-BUSYA2B4.js";
import { useRouter } from "next/compat/router";
import React from "react";
import { ClientClerkProvider } from "../app-router/client/ClerkProvider";
import { ClerkProvider as PageClerkProvider } from "../pages/ClerkProvider";
function ClerkProvider(props) {
  const router = useRouter();
  const Provider = router ? PageClerkProvider : ClientClerkProvider;
  return /* @__PURE__ */ React.createElement(Provider, { ...props });
}
export {
  ClerkProvider
};
//# sourceMappingURL=ClerkProvider.js.map