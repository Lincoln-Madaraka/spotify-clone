import type { CommerceMoneyAmount } from '@clerk/types';
import { CommercePlan } from './CommercePlan';
import type { CommerceSubscriptionItemJSON } from './JSON';
/**
 * The `CommerceSubscriptionItem` object is similar to the [`CommerceSubscriptionItemResource`](/docs/references/javascript/types/commerce-subscription-item-resource) object as it holds information about a subscription item, as well as methods for managing it. However, the `CommerceSubscriptionItem` object is different in that it is used in the [Backend API](https://clerk.com/docs/reference/backend-api/tag/commerce/get/commerce/subscription_items){{ target: '_blank' }} and is not directly accessible from the Frontend API.
 *
 * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to pin the SDK version to avoid breaking changes.
 */
export declare class CommerceSubscriptionItem {
    /**
     * The unique identifier for the subscription item.
     */
    readonly id: string;
    /**
     * The status of the subscription item.
     */
    readonly status: CommerceSubscriptionItemJSON['status'];
    /**
     * The plan period for the subscription item.
     */
    readonly planPeriod: 'month' | 'annual';
    /**
     * Unix timestamp (milliseconds) of when the current period starts.
     */
    readonly periodStart: number;
    /**
     * The next payment information.
     */
    readonly nextPayment: {
        /**
         * The amount of the next payment.
         */
        amount: number;
        /**
         * Unix timestamp (milliseconds) of when the next payment is scheduled.
         */
        date: number;
    } | null;
    /**
     * The current amount for the subscription item.
     */
    readonly amount: CommerceMoneyAmount | null | undefined;
    /**
     * The plan associated with this subscription item.
     */
    readonly plan: CommercePlan;
    /**
     * The plan ID.
     */
    readonly planId: string;
    /**
     * Unix timestamp (milliseconds) of when the subscription item was created.
     */
    readonly createdAt: number;
    /**
     * Unix timestamp (milliseconds) of when the subscription item was last updated.
     */
    readonly updatedAt: number;
    /**
     * Unix timestamp (milliseconds) of when the current period ends.
     */
    readonly periodEnd: number | null;
    /**
     * Unix timestamp (milliseconds) of when the subscription item was canceled.
     */
    readonly canceledAt: number | null;
    /**
     * Unix timestamp (milliseconds) of when the subscription item became past due.
     */
    readonly pastDueAt: number | null;
    /**
     * Unix timestamp (milliseconds) of when the subscription item ended.
     */
    readonly endedAt: number | null;
    /**
     * The payer ID.
     */
    readonly payerId: string;
    /**
     * Whether this subscription item is currently in a free trial period.
     */
    readonly isFreeTrial?: boolean | undefined;
    /**
     * The lifetime amount paid for this subscription item.
     */
    readonly lifetimePaid?: (CommerceMoneyAmount | null) | undefined;
    constructor(
    /**
     * The unique identifier for the subscription item.
     */
    id: string, 
    /**
     * The status of the subscription item.
     */
    status: CommerceSubscriptionItemJSON['status'], 
    /**
     * The plan period for the subscription item.
     */
    planPeriod: 'month' | 'annual', 
    /**
     * Unix timestamp (milliseconds) of when the current period starts.
     */
    periodStart: number, 
    /**
     * The next payment information.
     */
    nextPayment: {
        /**
         * The amount of the next payment.
         */
        amount: number;
        /**
         * Unix timestamp (milliseconds) of when the next payment is scheduled.
         */
        date: number;
    } | null, 
    /**
     * The current amount for the subscription item.
     */
    amount: CommerceMoneyAmount | null | undefined, 
    /**
     * The plan associated with this subscription item.
     */
    plan: CommercePlan, 
    /**
     * The plan ID.
     */
    planId: string, 
    /**
     * Unix timestamp (milliseconds) of when the subscription item was created.
     */
    createdAt: number, 
    /**
     * Unix timestamp (milliseconds) of when the subscription item was last updated.
     */
    updatedAt: number, 
    /**
     * Unix timestamp (milliseconds) of when the current period ends.
     */
    periodEnd: number | null, 
    /**
     * Unix timestamp (milliseconds) of when the subscription item was canceled.
     */
    canceledAt: number | null, 
    /**
     * Unix timestamp (milliseconds) of when the subscription item became past due.
     */
    pastDueAt: number | null, 
    /**
     * Unix timestamp (milliseconds) of when the subscription item ended.
     */
    endedAt: number | null, 
    /**
     * The payer ID.
     */
    payerId: string, 
    /**
     * Whether this subscription item is currently in a free trial period.
     */
    isFreeTrial?: boolean | undefined, 
    /**
     * The lifetime amount paid for this subscription item.
     */
    lifetimePaid?: (CommerceMoneyAmount | null) | undefined);
    static fromJSON(data: CommerceSubscriptionItemJSON): CommerceSubscriptionItem;
}
//# sourceMappingURL=CommerceSubscriptionItem.d.ts.map