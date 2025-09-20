import type { AuthObject } from '@clerk/backend';
import type { AuthenticateRequestOptions, ClerkRequest, RequestState } from '@clerk/backend/internal';
import { NextResponse } from 'next/server';
import type { RequestLike } from './types';
export declare const setRequestHeadersOnNextResponse: (res: NextResponse | Response, req: Request, newHeaders: Record<string, string>) => void;
export declare function decorateRequest(req: ClerkRequest, res: Response, requestState: RequestState, requestData: AuthenticateRequestOptions, keylessMode: Pick<AuthenticateRequestOptions, 'publishableKey' | 'secretKey'>, machineAuthObject: AuthObject | null): Response;
export declare const handleMultiDomainAndProxy: (clerkRequest: ClerkRequest, opts: AuthenticateRequestOptions) => {
    proxyUrl: string;
    isSatellite: boolean;
    domain: string;
    signInUrl: string;
};
export declare const redirectAdapter: (url: string | URL) => NextResponse<unknown>;
export declare function assertAuthStatus(req: RequestLike, error: string): void;
export declare function assertKey(key: string | undefined, onError: () => never): string;
/**
 * Assert that the provided token generates a matching signature.
 */
export declare function assertTokenSignature(token: string, key: string, signature?: string | null): void;
/**
 * Encrypt request data propagated between server requests.
 * @internal
 **/
export declare function encryptClerkRequestData(requestData: Partial<AuthenticateRequestOptions>, keylessModeKeys: Pick<AuthenticateRequestOptions, 'publishableKey' | 'secretKey'>, machineAuthObject: AuthObject | null): string | undefined;
/**
 * Decrypt request data propagated between server requests.
 * @internal
 */
export declare function decryptClerkRequestData(encryptedRequestData?: string | undefined | null): Partial<AuthenticateRequestOptions> & {
    machineAuthObject?: AuthObject;
};
//# sourceMappingURL=utils.d.ts.map