import "../chunk-BUSYA2B4.js";
import { ClerkProvider as ReactClerkProvider } from "@clerk/clerk-react";
import { setClerkJsLoadingErrorPackageName, setErrorThrowerOptions } from "@clerk/clerk-react/internal";
import { useRouter } from "next/router";
import React from "react";
import { useSafeLayoutEffect } from "../client-boundary/hooks/useSafeLayoutEffect";
import { ClerkNextOptionsProvider } from "../client-boundary/NextOptionsContext";
import { ClerkJSScript } from "../utils/clerk-js-script";
import { invalidateNextRouterCache } from "../utils/invalidateNextRouterCache";
import { mergeNextClerkPropsWithEnv } from "../utils/mergeNextClerkPropsWithEnv";
import { removeBasePath } from "../utils/removeBasePath";
import { RouterTelemetry } from "../utils/router-telemetry";
setErrorThrowerOptions({ packageName: "@clerk/nextjs" });
setClerkJsLoadingErrorPackageName("@clerk/nextjs");
function ClerkProvider({ children, ...props }) {
  var _a;
  const { __unstable_invokeMiddlewareOnAuthStateChange = true } = props;
  const { push, replace } = useRouter();
  ReactClerkProvider.displayName = "ReactClerkProvider";
  useSafeLayoutEffect(() => {
    window.__unstable__onBeforeSetActive = invalidateNextRouterCache;
  }, []);
  useSafeLayoutEffect(() => {
    window.__unstable__onAfterSetActive = () => {
      if (__unstable_invokeMiddlewareOnAuthStateChange) {
        void push(window.location.href);
      }
    };
  }, []);
  const navigate = (to) => push(removeBasePath(to));
  const replaceNavigate = (to) => replace(removeBasePath(to));
  const mergedProps = mergeNextClerkPropsWithEnv({
    ...props,
    routerPush: navigate,
    routerReplace: replaceNavigate
  });
  const initialState = ((_a = props.authServerSideProps) == null ? void 0 : _a.__clerk_ssr_state) || props.__clerk_ssr_state;
  return /* @__PURE__ */ React.createElement(ClerkNextOptionsProvider, { options: mergedProps }, /* @__PURE__ */ React.createElement(
    ReactClerkProvider,
    {
      ...mergedProps,
      initialState
    },
    /* @__PURE__ */ React.createElement(RouterTelemetry, null),
    /* @__PURE__ */ React.createElement(ClerkJSScript, { router: "pages" }),
    children
  ));
}
export {
  ClerkProvider
};
//# sourceMappingURL=ClerkProvider.js.map