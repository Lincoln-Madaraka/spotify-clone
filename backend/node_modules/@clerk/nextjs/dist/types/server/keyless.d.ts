import type { AccountlessApplication } from '@clerk/backend';
declare function getKeylessCookieName(): Promise<string>;
declare function getKeylessCookieValue(getter: (cookieName: string) => string | undefined): Promise<AccountlessApplication | undefined>;
export { getKeylessCookieValue, getKeylessCookieName };
//# sourceMappingURL=keyless.d.ts.map