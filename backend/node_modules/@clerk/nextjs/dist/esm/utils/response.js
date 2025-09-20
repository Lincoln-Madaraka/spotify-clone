import "../chunk-BUSYA2B4.js";
import { constants as nextConstants } from "../constants";
const isRedirect = (res) => {
  return res.headers.get(nextConstants.Headers.NextRedirect);
};
const setHeader = (res, name, val) => {
  res.headers.set(name, val);
  return res;
};
export {
  isRedirect,
  setHeader
};
//# sourceMappingURL=response.js.map