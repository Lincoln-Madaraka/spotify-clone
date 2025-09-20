import type { FeatureJSON } from './JSON';
/**
 * The `Feature` object represents a feature of a subscription plan.
 *
 * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to pin the SDK version to avoid breaking changes.
 */
export declare class Feature {
    /**
     * The unique identifier for the feature.
     */
    readonly id: string;
    /**
     * The name of the feature.
     */
    readonly name: string;
    /**
     * The description of the feature.
     */
    readonly description: string;
    /**
     * The URL-friendly identifier of the feature.
     */
    readonly slug: string;
    /**
     * The URL of the feature's avatar image.
     */
    readonly avatarUrl: string;
    constructor(
    /**
     * The unique identifier for the feature.
     */
    id: string, 
    /**
     * The name of the feature.
     */
    name: string, 
    /**
     * The description of the feature.
     */
    description: string, 
    /**
     * The URL-friendly identifier of the feature.
     */
    slug: string, 
    /**
     * The URL of the feature's avatar image.
     */
    avatarUrl: string);
    static fromJSON(data: FeatureJSON): Feature;
}
//# sourceMappingURL=Feature.d.ts.map