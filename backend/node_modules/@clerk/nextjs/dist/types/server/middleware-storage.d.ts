import { AsyncLocalStorage } from 'node:async_hooks';
import type { AuthenticateRequestOptions } from '@clerk/backend/internal';
export declare const clerkMiddlewareRequestDataStore: Map<"requestData", AuthenticateRequestOptions>;
export declare const clerkMiddlewareRequestDataStorage: AsyncLocalStorage<Map<"requestData", AuthenticateRequestOptions>>;
//# sourceMappingURL=middleware-storage.d.ts.map