import type { AuthObject } from '@clerk/backend';
import type { AuthenticateRequestOptions, SignedInAuthObject, SignedOutAuthObject } from '@clerk/backend/internal';
import type { PendingSessionOptions } from '@clerk/types';
import type { LoggerNoCommit } from '../../utils/debugLogger';
import type { RequestLike } from '../types';
export type GetAuthDataFromRequestOptions = {
    secretKey?: string;
    logger?: LoggerNoCommit;
    acceptsToken?: AuthenticateRequestOptions['acceptsToken'];
} & PendingSessionOptions;
/**
 * Given a request object, builds an auth object from the request data. Used in server-side environments to get access
 * to auth data for a given request.
 */
export declare const getSessionAuthDataFromRequest: (req: RequestLike, { treatPendingAsSignedOut, ...opts }?: GetAuthDataFromRequestOptions) => SignedInAuthObject | SignedOutAuthObject;
/**
 * Given a request object, builds an auth object from the request data. Used in server-side environments to get access
 * to auth data for a given request.
 *
 * This function handles both session tokens and machine tokens:
 * - Session tokens: Decoded from JWT and validated
 * - Machine tokens: Retrieved from encrypted request data (x-clerk-request-data header)
 */
export declare const getAuthDataFromRequest: (req: RequestLike, opts?: GetAuthDataFromRequestOptions) => AuthObject;
//# sourceMappingURL=getAuthDataFromRequest.d.ts.map