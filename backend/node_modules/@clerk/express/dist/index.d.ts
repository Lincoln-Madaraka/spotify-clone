import { ClerkClient as ClerkClient$1, createClerkClient } from '@clerk/backend';
export * from '@clerk/backend';
import { SignedInAuthObject, SignedOutAuthObject, AuthenticateRequestOptions, GetAuthFn, RequestState } from '@clerk/backend/internal';
import { PendingSessionOptions } from '@clerk/types';
import { Request, RequestHandler } from 'express';

declare const clerkClient: ClerkClient$1;

type ExpressRequestWithAuth = Request & {
    auth: (options?: PendingSessionOptions) => SignedInAuthObject | SignedOutAuthObject;
};
type ClerkMiddlewareOptions = AuthenticateRequestOptions & {
    debug?: boolean;
    clerkClient?: ClerkClient;
    /**
     * @deprecated This option is deprecated as API requests don't trigger handshake flow.
     * Handshake is only relevant for server-rendered applications with page navigation,
     * not for API endpoints. This option will be removed in a future version.
     *
     * @default true
     */
    enableHandshake?: boolean;
};
type ClerkClient = ReturnType<typeof createClerkClient>;
type AuthenticateRequestParams = {
    clerkClient: ClerkClient;
    request: Request;
    options?: ClerkMiddlewareOptions;
};

/**
 * Middleware that integrates Clerk authentication into your Express application.
 * It checks the request's cookies and headers for a session JWT and, if found,
 * attaches the Auth object to the request object under the `auth` key.
 *
 * @example
 * app.use(clerkMiddleware(options));
 *
 * @example
 * const clerkClient = createClerkClient({ ... });
 * app.use(clerkMiddleware({ clerkClient }));
 *
 * @example
 * app.use(clerkMiddleware());
 */
declare const clerkMiddleware: (options?: ClerkMiddlewareOptions) => RequestHandler;

/**
 * Retrieves the Clerk AuthObject using the current request object.
 *
 * @param {GetAuthOptions} options - Optional configuration for retriving auth object.
 * @returns {AuthObject} Object with information about the request state and claims.
 * @throws {Error} `clerkMiddleware` or `requireAuth` is required to be set in the middleware chain before this util is used.
 */
declare const getAuth: GetAuthFn<Request>;

/**
 * Middleware to require authentication for user requests.
 * Redirects unauthenticated requests to the sign-in url.
 *
 * @example
 * // Basic usage
 * import { requireAuth } from '@clerk/express'
 *
 * router.use(requireAuth())
 * //or
 * router.get('/path', requireAuth(), getHandler)
 *
 * @example
 * // Customizing the sign-in path
 * router.use(requireAuth({ signInUrl: '/sign-in' }))
 *
 * @example
 * // Combining with permission check
 * import { getAuth, requireAuth } from '@clerk/express'
 *
 * const hasPermission = (req, res, next) => {
 *    const auth = getAuth(req)
 *    if (!auth.has({ permission: 'permission' })) {
 *      return res.status(403).send('Forbidden')
 *    }
 *    return next()
 * }
 * router.get('/path', requireAuth(), hasPermission, getHandler)
 */
declare const requireAuth: (options?: ClerkMiddlewareOptions) => RequestHandler;

/**
 * @internal
 * Authenticates an Express request by wrapping clerkClient.authenticateRequest and
 * converts the express request object into a standard web request object
 *
 * @param opts - Configuration options for request authentication
 * @param opts.clerkClient - The Clerk client instance to use for authentication
 * @param opts.request - The Express request object to authenticate
 * @param opts.options - Optional middleware configuration options
 */
declare const authenticateRequest: (opts: AuthenticateRequestParams) => Promise<RequestState<"session_token">>;

export { type ExpressRequestWithAuth, authenticateRequest, clerkClient, clerkMiddleware, getAuth, requireAuth };
