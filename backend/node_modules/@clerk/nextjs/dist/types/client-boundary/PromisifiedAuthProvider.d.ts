import { useAuth } from '@clerk/clerk-react';
import type { InitialState } from '@clerk/types';
import React from 'react';
export declare function PromisifiedAuthProvider({ authPromise, children, }: {
    authPromise: Promise<InitialState> | InitialState;
    children: React.ReactNode;
}): React.JSX.Element;
/**
 * Returns the current auth state, the user and session ids and the `getToken`
 * that can be used to retrieve the given template or the default Clerk token.
 *
 * Until Clerk loads, `isLoaded` will be set to `false`.
 * Once Clerk loads, `isLoaded` will be set to `true`, and you can
 * safely access the `userId` and `sessionId` variables.
 *
 * For projects using NextJs or Remix, you can have immediate access to this data during SSR
 * simply by using the `ClerkProvider`.
 *
 * @example
 * import { useAuth } from '@clerk/nextjs'
 *
 * function Hello() {
 *   const { isSignedIn, sessionId, userId } = useAuth();
 *   if(isSignedIn) {
 *     return null;
 *   }
 *   console.log(sessionId, userId)
 *   return <div>...</div>
 * }
 *
 * @example
 * This page will be fully rendered during SSR.
 *
 * ```tsx
 * import { useAuth } from '@clerk/nextjs'
 *
 * export HelloPage = () => {
 *   const { isSignedIn, sessionId, userId } = useAuth();
 *   console.log(isSignedIn, sessionId, userId)
 *   return <div>...</div>
 * }
 * ```
 */
export declare function usePromisifiedAuth(options?: Parameters<typeof useAuth>[0]): import("@clerk/types").UseAuthReturn;
//# sourceMappingURL=PromisifiedAuthProvider.d.ts.map