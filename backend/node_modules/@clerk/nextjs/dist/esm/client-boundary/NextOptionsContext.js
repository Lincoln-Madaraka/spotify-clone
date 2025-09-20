import "../chunk-BUSYA2B4.js";
import React from "react";
const ClerkNextOptionsCtx = React.createContext(void 0);
ClerkNextOptionsCtx.displayName = "ClerkNextOptionsCtx";
const useClerkNextOptions = () => {
  const ctx = React.useContext(ClerkNextOptionsCtx);
  return ctx == null ? void 0 : ctx.value;
};
const ClerkNextOptionsProvider = (props) => {
  const { children, options } = props;
  return /* @__PURE__ */ React.createElement(ClerkNextOptionsCtx.Provider, { value: { value: options } }, children);
};
export {
  ClerkNextOptionsProvider,
  useClerkNextOptions
};
//# sourceMappingURL=NextOptionsContext.js.map