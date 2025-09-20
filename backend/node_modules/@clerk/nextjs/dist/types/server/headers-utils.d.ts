import { constants } from '@clerk/backend/internal';
import type { NextRequest } from 'next/server';
import type { RequestLike } from './types';
export declare function getCustomAttributeFromRequest(req: RequestLike, key: string): string | null | undefined;
export declare function getAuthKeyFromRequest(req: RequestLike, key: keyof typeof constants.Attributes): string | null | undefined;
export declare function getHeader(req: RequestLike, name: string): string | null | undefined;
export declare function detectClerkMiddleware(req: RequestLike): boolean;
export declare function isNextRequest(val: unknown): val is NextRequest;
export declare function isRequestWebAPI(val: unknown): val is Request;
//# sourceMappingURL=headers-utils.d.ts.map