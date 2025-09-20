import type { AuthObject } from '@clerk/backend';
import type { Without } from '@clerk/types';
import type { PropsWithChildren } from 'react';
import React from 'react';
import type { NextClerkProviderProps } from '../../types';
export declare function getKeylessStatus(params: Without<NextClerkProviderProps, '__unstable_invokeMiddlewareOnAuthStateChange'>): Promise<{
    shouldRunAsKeyless: boolean;
    runningWithClaimedKeys: boolean;
}>;
type KeylessProviderProps = PropsWithChildren<{
    rest: Without<NextClerkProviderProps, '__unstable_invokeMiddlewareOnAuthStateChange'>;
    runningWithClaimedKeys: boolean;
    generateStatePromise: () => Promise<AuthObject | null>;
    generateNonce: () => Promise<string>;
}>;
export declare const KeylessProvider: (props: KeylessProviderProps) => Promise<React.JSX.Element>;
export {};
//# sourceMappingURL=keyless-provider.d.ts.map