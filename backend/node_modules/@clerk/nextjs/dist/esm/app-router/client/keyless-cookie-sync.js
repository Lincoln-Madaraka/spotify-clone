"use client";
import "../../chunk-BUSYA2B4.js";
import { useSelectedLayoutSegments } from "next/navigation";
import { useEffect } from "react";
import { canUseKeyless } from "../../utils/feature-flags";
function KeylessCookieSync(props) {
  var _a;
  const segments = useSelectedLayoutSegments();
  const isNotFoundRoute = ((_a = segments[0]) == null ? void 0 : _a.startsWith("/_not-found")) || false;
  useEffect(() => {
    if (canUseKeyless && !isNotFoundRoute) {
      void import("../keyless-actions.js").then(
        (m) => m.syncKeylessConfigAction({
          ...props,
          // Preserve the current url and return back, once keys are synced in the middleware
          returnUrl: window.location.href
        })
      );
    }
  }, [isNotFoundRoute]);
  return props.children;
}
export {
  KeylessCookieSync
};
//# sourceMappingURL=keyless-cookie-sync.js.map