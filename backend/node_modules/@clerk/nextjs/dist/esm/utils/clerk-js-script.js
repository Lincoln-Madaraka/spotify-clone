import "../chunk-BUSYA2B4.js";
import { useClerk } from "@clerk/clerk-react";
import { buildClerkJsScriptAttributes, clerkJsScriptUrl } from "@clerk/clerk-react/internal";
import NextScript from "next/script";
import React from "react";
import { useClerkNextOptions } from "../client-boundary/NextOptionsContext";
function ClerkJSScript(props) {
  const { publishableKey, clerkJSUrl, clerkJSVersion, clerkJSVariant, nonce } = useClerkNextOptions();
  const { domain, proxyUrl } = useClerk();
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
  const scriptUrl = clerkJsScriptUrl(options);
  const Script = props.router === "app" ? "script" : NextScript;
  return /* @__PURE__ */ React.createElement(
    Script,
    {
      src: scriptUrl,
      "data-clerk-js-script": true,
      async: true,
      defer: props.router === "pages" ? false : void 0,
      crossOrigin: "anonymous",
      strategy: props.router === "pages" ? "beforeInteractive" : void 0,
      ...buildClerkJsScriptAttributes(options)
    }
  );
}
export {
  ClerkJSScript
};
//# sourceMappingURL=clerk-js-script.js.map