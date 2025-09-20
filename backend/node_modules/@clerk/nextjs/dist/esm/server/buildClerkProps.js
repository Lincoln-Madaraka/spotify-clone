import "../chunk-BUSYA2B4.js";
import { makeAuthObjectSerializable, stripPrivateDataFromObject } from "@clerk/backend/internal";
import { getAuthDataFromRequest } from "./data/getAuthDataFromRequest";
const buildClerkProps = (req, initialState = {}) => {
  const sanitizedAuthObject = getDynamicAuthData(req, initialState);
  const __clerk_ssr_state = process.env.NODE_ENV !== "production" ? JSON.parse(JSON.stringify(sanitizedAuthObject)) : sanitizedAuthObject;
  return { __clerk_ssr_state };
};
function getDynamicAuthData(req, initialState = {}) {
  const authObject = getAuthDataFromRequest(req);
  return makeAuthObjectSerializable(stripPrivateDataFromObject({ ...authObject, ...initialState }));
}
export {
  buildClerkProps,
  getDynamicAuthData
};
//# sourceMappingURL=buildClerkProps.js.map