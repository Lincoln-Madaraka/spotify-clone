import type { M2MToken } from '../resources/M2MToken';
import { AbstractAPI } from './AbstractApi';
type CreateM2MTokenParams = {
    /**
     * Custom machine secret key for authentication.
     */
    machineSecretKey?: string;
    /**
     * Number of seconds until the token expires.
     *
     * @default null - Token does not expire
     */
    secondsUntilExpiration?: number | null;
    claims?: Record<string, unknown> | null;
};
type RevokeM2MTokenParams = {
    /**
     * Custom machine secret key for authentication.
     */
    machineSecretKey?: string;
    /**
     * Machine-to-machine token ID to revoke.
     */
    m2mTokenId: string;
    revocationReason?: string | null;
};
type VerifyM2MTokenParams = {
    /**
     * Custom machine secret key for authentication.
     */
    machineSecretKey?: string;
    /**
     * Machine-to-machine token to verify.
     */
    token: string;
};
export declare class M2MTokenApi extends AbstractAPI {
    #private;
    createToken(params?: CreateM2MTokenParams): Promise<M2MToken>;
    revokeToken(params: RevokeM2MTokenParams): Promise<M2MToken>;
    verifyToken(params: VerifyM2MTokenParams): Promise<M2MToken>;
}
export {};
//# sourceMappingURL=M2MTokenApi.d.ts.map