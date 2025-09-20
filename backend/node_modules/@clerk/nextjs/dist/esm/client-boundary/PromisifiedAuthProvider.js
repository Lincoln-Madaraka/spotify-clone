"use client";
import "../chunk-BUSYA2B4.js";
import { useAuth } from "@clerk/clerk-react";
import { useDerivedAuth } from "@clerk/clerk-react/internal";
import { useRouter } from "next/compat/router";
import React from "react";
const PromisifiedAuthContext = React.createContext(null);
function PromisifiedAuthProvider({
  authPromise,
  children
}) {
  return /* @__PURE__ */ React.createElement(PromisifiedAuthContext.Provider, { value: authPromise }, children);
}
function usePromisifiedAuth(options = {}) {
  const isPagesRouter = useRouter();
  const valueFromContext = React.useContext(PromisifiedAuthContext);
  let resolvedData = valueFromContext;
  if (valueFromContext && "then" in valueFromContext) {
    resolvedData = React.use(valueFromContext);
  }
  if (typeof window === "undefined") {
    if (isPagesRouter) {
      return useAuth(options);
    }
    return useDerivedAuth({ ...resolvedData, ...options });
  } else {
    return useAuth({ ...resolvedData, ...options });
  }
}
export {
  PromisifiedAuthProvider,
  usePromisifiedAuth
};
//# sourceMappingURL=PromisifiedAuthProvider.js.map