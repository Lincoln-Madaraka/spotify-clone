import type { ClerkRequest } from '@clerk/backend/internal';
/**
 * Grabs the dev browser JWT from cookies and appends it to the redirect URL when redirecting to cross-origin.
 */
export declare const serverRedirectWithAuth: (clerkRequest: ClerkRequest, res: Response, opts: {
    secretKey: string;
}) => Response;
//# sourceMappingURL=serverRedirectWithAuth.d.ts.map