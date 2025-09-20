import type { AuthObject } from '@clerk/backend';
import type { AuthenticatedMachineObject, AuthenticateRequestOptions, InferAuthObjectFromToken, InferAuthObjectFromTokenArray, RedirectFun, SignedInAuthObject } from '@clerk/backend/internal';
import { TokenType } from '@clerk/backend/internal';
import type { CheckAuthorizationFromSessionClaims, CheckAuthorizationParamsFromSessionClaims, OrganizationCustomPermissionKey } from '@clerk/types';
type AuthProtectOptions = {
    /**
     * The token type to check.
     */
    token?: AuthenticateRequestOptions['acceptsToken'];
    /**
     * The URL to redirect the user to if they are not authorized.
     */
    unauthorizedUrl?: string;
    /**
     * The URL to redirect the user to if they are not authenticated.
     */
    unauthenticatedUrl?: string;
};
/**
 * Throws a Nextjs notFound error if user is not authenticated or authorized.
 */
export interface AuthProtect {
    /**
     * @example
     * auth.protect({ permission: 'org:admin:example1' });
     * auth.protect({ role: 'admin' });
     */
    <P extends OrganizationCustomPermissionKey>(params?: CheckAuthorizationParamsFromSessionClaims<P>, options?: AuthProtectOptions): Promise<SignedInAuthObject>;
    /**
     * @example
     * auth.protect(has => has({ permission: 'org:admin:example1' }));
     */
    (params?: (has: CheckAuthorizationFromSessionClaims) => boolean, options?: AuthProtectOptions): Promise<SignedInAuthObject>;
    /**
     * @example
     * auth.protect({ token: 'session_token' });
     */
    <T extends TokenType>(options?: AuthProtectOptions & {
        token: T;
    }): Promise<InferAuthObjectFromToken<T, SignedInAuthObject, AuthenticatedMachineObject>>;
    /**
     * @example
     * auth.protect({ token: ['session_token', 'm2m_token'] });
     */
    <T extends TokenType[]>(options?: AuthProtectOptions & {
        token: T;
    }): Promise<InferAuthObjectFromTokenArray<T, SignedInAuthObject, AuthenticatedMachineObject>>;
    /**
     * @example
     * auth.protect({ token: 'any' });
     */
    (options?: AuthProtectOptions & {
        token: 'any';
    }): Promise<SignedInAuthObject | AuthenticatedMachineObject>;
    /**
     * @example
     * auth.protect();
     */
    (options?: AuthProtectOptions): Promise<SignedInAuthObject>;
}
export declare function createProtect(opts: {
    request: Request;
    authObject: AuthObject;
    /**
     * middleware and pages throw a notFound error if signed out
     * but the middleware needs to throw an error it can catch
     * use this callback to customise the behavior
     */
    notFound: () => never;
    /**
     * see {@link notFound} above
     */
    redirect: (url: string) => void;
    /**
     * For m2m requests, throws a 401 response
     */
    unauthorized: () => void;
    /**
     * protect() in middleware redirects to signInUrl if signed out
     * protect() in pages throws a notFound error if signed out
     * use this callback to customise the behavior
     */
    redirectToSignIn: RedirectFun<unknown>;
}): AuthProtect;
export {};
//# sourceMappingURL=protect.d.ts.map