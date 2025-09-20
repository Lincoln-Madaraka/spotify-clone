import type { AccountlessApplication } from '@clerk/backend';
export declare const createKeylessModeMessage: (keys: AccountlessApplication) => string;
export declare const createConfirmationMessage: () => string;
export declare const clerkDevelopmentCache: {
    __cache: Map<string, {
        expiresAt: number;
        data?: unknown;
    }>;
    log: (param: {
        cacheKey: string;
        msg: string;
    }) => void;
    run: (callback: () => Promise<unknown>, { cacheKey, onSuccessStale, onErrorStale, }: {
        cacheKey: string;
        onSuccessStale?: number;
        onErrorStale?: number;
    }) => Promise<unknown>;
} | undefined;
//# sourceMappingURL=keyless-log-cache.d.ts.map