import type { IncomingMessage } from 'http';
import type { NextApiRequest } from 'next';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import type { NextMiddleware, NextRequest } from 'next/server';
type GsspRequest = IncomingMessage & {
    cookies: NextApiRequestCookies;
};
export type RequestLike = NextRequest | NextApiRequest | GsspRequest;
export type NextMiddlewareRequestParam = Parameters<NextMiddleware>['0'];
export type NextMiddlewareEvtParam = Parameters<NextMiddleware>['1'];
export type NextMiddlewareReturn = ReturnType<NextMiddleware>;
export {};
//# sourceMappingURL=types.d.ts.map