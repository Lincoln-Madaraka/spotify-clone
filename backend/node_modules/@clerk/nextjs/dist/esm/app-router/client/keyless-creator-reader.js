import "../../chunk-BUSYA2B4.js";
import { useSelectedLayoutSegments } from "next/navigation";
import React, { useEffect } from "react";
import { createOrReadKeylessAction } from "../keyless-actions";
const KeylessCreatorOrReader = (props) => {
  var _a;
  const { children } = props;
  const segments = useSelectedLayoutSegments();
  const isNotFoundRoute = ((_a = segments[0]) == null ? void 0 : _a.startsWith("/_not-found")) || false;
  const [state, fetchKeys] = React.useActionState(createOrReadKeylessAction, null);
  useEffect(() => {
    if (isNotFoundRoute) {
      return;
    }
    React.startTransition(() => {
      fetchKeys();
    });
  }, [isNotFoundRoute]);
  if (!React.isValidElement(children)) {
    return children;
  }
  return React.cloneElement(children, {
    key: state == null ? void 0 : state.publishableKey,
    publishableKey: state == null ? void 0 : state.publishableKey,
    __internal_keyless_claimKeylessApplicationUrl: state == null ? void 0 : state.claimUrl,
    __internal_keyless_copyInstanceKeysUrl: state == null ? void 0 : state.apiKeysUrl,
    __internal_bypassMissingPublishableKey: true
  });
};
export {
  KeylessCreatorOrReader
};
//# sourceMappingURL=keyless-creator-reader.js.map