import type { ProtectProps } from '@clerk/clerk-react';
import type { PendingSessionOptions } from '@clerk/types';
import React from 'react';
export declare function SignedIn(props: React.PropsWithChildren<PendingSessionOptions>): Promise<React.JSX.Element | null>;
export declare function SignedOut(props: React.PropsWithChildren<PendingSessionOptions>): Promise<React.JSX.Element | null>;
/**
 * Use `<Protect/>` in order to prevent unauthenticated or unauthorized users from accessing the children passed to the component.
 *
 * Examples:
 * ```
 * <Protect permission="a_permission_key" />
 * <Protect role="a_role_key" />
 * <Protect condition={(has) => has({permission:"a_permission_key"})} />
 * <Protect condition={(has) => has({role:"a_role_key"})} />
 * <Protect fallback={<p>Unauthorized</p>} />
 * ```
 */
export declare function Protect(props: ProtectProps): Promise<React.JSX.Element | null>;
//# sourceMappingURL=controlComponents.d.ts.map