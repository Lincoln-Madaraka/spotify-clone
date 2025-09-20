import "../chunk-BUSYA2B4.js";
import { constants } from "@clerk/backend/internal";
import { isTruthy } from "@clerk/shared/underscore";
import { withLogger } from "../utils/debugLogger";
import { isNextWithUnstableServerActions } from "../utils/sdk-versions";
import {
  getAuthDataFromRequest as getAuthDataFromRequestOriginal,
  getSessionAuthDataFromRequest as getSessionAuthDataFromRequestOriginal
} from "./data/getAuthDataFromRequest";
import { getAuthAuthHeaderMissing } from "./errors";
import { detectClerkMiddleware, getHeader } from "./headers-utils";
import { assertAuthStatus } from "./utils";
const createAsyncGetAuth = ({
  debugLoggerName,
  noAuthStatusMessage
}) => withLogger(debugLoggerName, (logger) => {
  return async (req, opts) => {
    if (isTruthy(getHeader(req, constants.Headers.EnableDebug))) {
      logger.enable();
    }
    if (!detectClerkMiddleware(req)) {
      if (isNextWithUnstableServerActions) {
        assertAuthStatus(req, noAuthStatusMessage);
      }
      const missConfiguredMiddlewareLocation = await import("./fs/middleware-location.js").then((m) => m.suggestMiddlewareLocation()).catch(() => void 0);
      if (missConfiguredMiddlewareLocation) {
        throw new Error(missConfiguredMiddlewareLocation);
      }
      assertAuthStatus(req, noAuthStatusMessage);
    }
    const getAuthDataFromRequest = (req2, opts2 = {}) => {
      return getAuthDataFromRequestOriginal(req2, { ...opts2, logger, acceptsToken: opts2 == null ? void 0 : opts2.acceptsToken });
    };
    return getAuthDataFromRequest(req, { ...opts, logger, acceptsToken: opts == null ? void 0 : opts.acceptsToken });
  };
});
const createSyncGetAuth = ({
  debugLoggerName,
  noAuthStatusMessage
}) => withLogger(debugLoggerName, (logger) => {
  return (req, opts) => {
    if (isTruthy(getHeader(req, constants.Headers.EnableDebug))) {
      logger.enable();
    }
    assertAuthStatus(req, noAuthStatusMessage);
    const getAuthDataFromRequest = (req2, opts2 = {}) => {
      return getSessionAuthDataFromRequestOriginal(req2, { ...opts2, logger, acceptsToken: opts2 == null ? void 0 : opts2.acceptsToken });
    };
    return getAuthDataFromRequest(req, { ...opts, logger, acceptsToken: opts == null ? void 0 : opts.acceptsToken });
  };
});
const getAuth = createSyncGetAuth({
  debugLoggerName: "getAuth()",
  noAuthStatusMessage: getAuthAuthHeaderMissing()
});
export {
  createAsyncGetAuth,
  createSyncGetAuth,
  getAuth
};
//# sourceMappingURL=createGetAuth.js.map