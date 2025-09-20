import { type CommerceMoneyAmount } from '@clerk/types';
import { CommerceSubscriptionItem } from './CommerceSubscriptionItem';
import type { CommerceSubscriptionJSON } from './JSON';
/**
 * The `CommerceSubscription` object is similar to the [`CommerceSubscriptionResource`](/docs/references/javascript/types/commerce-subscription-resource) object as it holds information about a subscription, as well as methods for managing it. However, the `CommerceSubscription` object is different in that it is used in the [Backend API](https://clerk.com/docs/reference/backend-api/tag/billing/get/organizations/%7Borganization_id%7D/billing/subscription){{ target: '_blank' }} and is not directly accessible from the Frontend API.
 *
 * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to pin the SDK version to avoid breaking changes.
 */
export declare class CommerceSubscription {
    /**
     * The unique identifier for the commerce subscription.
     */
    readonly id: string;
    /**
     * The current status of the subscription.
     */
    readonly status: CommerceSubscriptionJSON['status'];
    /**
     * The ID of the payer for this subscription.
     */
    readonly payerId: string;
    /**
     * Unix timestamp (milliseconds) of when the subscription was created.
     */
    readonly createdAt: number;
    /**
     * Unix timestamp (milliseconds) of when the subscription was last updated.
     */
    readonly updatedAt: number;
    /**
     * Unix timestamp (milliseconds) of when the subscription became active.
     */
    readonly activeAt: number | null;
    /**
     * Unix timestamp (milliseconds) of when the subscription became past due.
     */
    readonly pastDueAt: number | null;
    /**
     * Array of subscription items in this subscription.
     */
    readonly subscriptionItems: CommerceSubscriptionItem[];
    /**
     * Information about the next scheduled payment.
     */
    readonly nextPayment: {
        date: number;
        amount: CommerceMoneyAmount;
    } | null;
    /**
     * Whether the payer is eligible for a free trial.
     */
    readonly eligibleForFreeTrial: boolean;
    constructor(
    /**
     * The unique identifier for the commerce subscription.
     */
    id: string, 
    /**
     * The current status of the subscription.
     */
    status: CommerceSubscriptionJSON['status'], 
    /**
     * The ID of the payer for this subscription.
     */
    payerId: string, 
    /**
     * Unix timestamp (milliseconds) of when the subscription was created.
     */
    createdAt: number, 
    /**
     * Unix timestamp (milliseconds) of when the subscription was last updated.
     */
    updatedAt: number, 
    /**
     * Unix timestamp (milliseconds) of when the subscription became active.
     */
    activeAt: number | null, 
    /**
     * Unix timestamp (milliseconds) of when the subscription became past due.
     */
    pastDueAt: number | null, 
    /**
     * Array of subscription items in this subscription.
     */
    subscriptionItems: CommerceSubscriptionItem[], 
    /**
     * Information about the next scheduled payment.
     */
    nextPayment: {
        date: number;
        amount: CommerceMoneyAmount;
    } | null, 
    /**
     * Whether the payer is eligible for a free trial.
     */
    eligibleForFreeTrial: boolean);
    static fromJSON(data: CommerceSubscriptionJSON): CommerceSubscription;
}
//# sourceMappingURL=CommerceSubscription.d.ts.map