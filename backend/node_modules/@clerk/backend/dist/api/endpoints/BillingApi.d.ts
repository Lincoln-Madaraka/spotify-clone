import type { ClerkPaginationRequest } from '@clerk/types';
import type { CommercePlan } from '../resources/CommercePlan';
import type { CommerceSubscription } from '../resources/CommerceSubscription';
import type { CommerceSubscriptionItem } from '../resources/CommerceSubscriptionItem';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import { AbstractAPI } from './AbstractApi';
type GetOrganizationListParams = ClerkPaginationRequest<{
    payerType: 'org' | 'user';
}>;
type CancelSubscriptionItemParams = {
    /**
     * If true, the subscription item will be canceled immediately. If false or undefined, the subscription item will be canceled at the end of the current billing period.
     * @default undefined
     */
    endNow?: boolean;
};
type ExtendSubscriptionItemFreeTrialParams = {
    /**
     * RFC3339 timestamp to extend the free trial to.
     * Must be in the future and not more than 365 days from the current trial end.
     */
    extendTo: Date;
};
export declare class BillingAPI extends AbstractAPI {
    /**
     * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change.
     * It is advised to pin the SDK version to avoid breaking changes.
     */
    getPlanList(params?: GetOrganizationListParams): Promise<PaginatedResourceResponse<CommercePlan[]>>;
    /**
     * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change.
     * It is advised to pin the SDK version to avoid breaking changes.
     */
    cancelSubscriptionItem(subscriptionItemId: string, params?: CancelSubscriptionItemParams): Promise<CommerceSubscriptionItem>;
    /**
     * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change.
     * It is advised to pin the SDK version to avoid breaking changes.
     */
    extendSubscriptionItemFreeTrial(subscriptionItemId: string, params: ExtendSubscriptionItemFreeTrialParams): Promise<CommerceSubscriptionItem>;
    /**
     * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change.
     * It is advised to pin the SDK version to avoid breaking changes.
     */
    getOrganizationBillingSubscription(organizationId: string): Promise<CommerceSubscription>;
    /**
     * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change.
     * It is advised to pin the SDK version to avoid breaking changes.
     */
    getUserBillingSubscription(userId: string): Promise<CommerceSubscription>;
}
export {};
//# sourceMappingURL=BillingApi.d.ts.map