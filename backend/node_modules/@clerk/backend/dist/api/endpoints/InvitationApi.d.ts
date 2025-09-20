import type { ClerkPaginationRequest } from '@clerk/types';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import type { InvitationStatus } from '../resources/Enums';
import type { Invitation } from '../resources/Invitation';
import { AbstractAPI } from './AbstractApi';
type TemplateSlug = 'invitation' | 'waitlist_invitation';
type CreateParams = {
    emailAddress: string;
    expiresInDays?: number;
    ignoreExisting?: boolean;
    notify?: boolean;
    publicMetadata?: UserPublicMetadata;
    redirectUrl?: string;
    templateSlug?: TemplateSlug;
};
type CreateBulkParams = Array<CreateParams>;
type GetInvitationListParams = ClerkPaginationRequest<{
    /**
     * Filters invitations based on their status.
     *
     * @example
     * Get all revoked invitations
     * ```ts
     * import { createClerkClient } from '@clerk/backend';
     * const clerkClient = createClerkClient(...)
     * await clerkClient.invitations.getInvitationList({ status: 'revoked' })
     * ```
     */
    status?: InvitationStatus;
    /**
     * Filters invitations based on `email_address` or `id`.
     *
     * @example
     * Get all invitations for a specific email address
     * ```ts
     * import { createClerkClient } from '@clerk/backend';
     * const clerkClient = createClerkClient(...)
     * await clerkClient.invitations.getInvitationList({ query: 'user@example.com' })
     * ```
     */
    query?: string;
}>;
export declare class InvitationAPI extends AbstractAPI {
    getInvitationList(params?: GetInvitationListParams): Promise<PaginatedResourceResponse<Invitation[]>>;
    createInvitation(params: CreateParams): Promise<Invitation>;
    createInvitationBulk(params: CreateBulkParams): Promise<Invitation>;
    revokeInvitation(invitationId: string): Promise<Invitation>;
}
export {};
//# sourceMappingURL=InvitationApi.d.ts.map