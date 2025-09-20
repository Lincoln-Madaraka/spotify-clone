import type { M2MTokenJSON } from './JSON';
export declare class M2MToken {
    readonly id: string;
    readonly subject: string;
    readonly scopes: string[];
    readonly claims: Record<string, any> | null;
    readonly revoked: boolean;
    readonly revocationReason: string | null;
    readonly expired: boolean;
    readonly expiration: number | null;
    readonly createdAt: number;
    readonly updatedAt: number;
    readonly token?: string | undefined;
    constructor(id: string, subject: string, scopes: string[], claims: Record<string, any> | null, revoked: boolean, revocationReason: string | null, expired: boolean, expiration: number | null, createdAt: number, updatedAt: number, token?: string | undefined);
    static fromJSON(data: M2MTokenJSON): M2MToken;
}
//# sourceMappingURL=M2MToken.d.ts.map