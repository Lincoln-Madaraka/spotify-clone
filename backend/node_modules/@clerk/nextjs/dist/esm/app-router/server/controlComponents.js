import "../../chunk-BUSYA2B4.js";
import React from "react";
import { auth } from "./auth";
async function SignedIn(props) {
  const { children } = props;
  const { userId } = await auth({ treatPendingAsSignedOut: props.treatPendingAsSignedOut });
  return userId ? /* @__PURE__ */ React.createElement(React.Fragment, null, children) : null;
}
async function SignedOut(props) {
  const { children } = props;
  const { userId } = await auth({ treatPendingAsSignedOut: props.treatPendingAsSignedOut });
  return userId ? null : /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
async function Protect(props) {
  const { children, fallback, ...restAuthorizedParams } = props;
  const { has, userId } = await auth({ treatPendingAsSignedOut: props.treatPendingAsSignedOut });
  const unauthorized = fallback ? /* @__PURE__ */ React.createElement(React.Fragment, null, fallback) : null;
  const authorized = /* @__PURE__ */ React.createElement(React.Fragment, null, children);
  if (!userId) {
    return unauthorized;
  }
  if (typeof restAuthorizedParams.condition === "function") {
    return restAuthorizedParams.condition(has) ? authorized : unauthorized;
  }
  if (restAuthorizedParams.role || restAuthorizedParams.permission || restAuthorizedParams.feature || restAuthorizedParams.plan) {
    return has(restAuthorizedParams) ? authorized : unauthorized;
  }
  return authorized;
}
export {
  Protect,
  SignedIn,
  SignedOut
};
//# sourceMappingURL=controlComponents.js.map