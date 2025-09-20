import type { VerifyWebhookOptions } from '@clerk/backend/webhooks';
import type { RequestLike } from './server/types';
export * from '@clerk/backend/webhooks';
/**
 * Verifies the authenticity of a webhook request using Svix.
 *
 * @param request - The incoming webhook request object
 * @param options - Optional configuration object
 * @param options.signingSecret - Custom signing secret. If not provided, falls back to CLERK_WEBHOOK_SIGNING_SECRET env variable
 * @throws Will throw an error if the webhook signature verification fails
 * @returns A promise that resolves to the verified webhook event data
 *
 * @example
 * ```typescript
 * import { verifyWebhook } from '@clerk/nextjs/webhooks';
 *
 * export async function POST(req: Request) {
 *   try {
 *     const evt = await verifyWebhook(req);
 *
 *     // Access the event data
 *     const { id } = evt.data;
 *     const eventType = evt.type;
 *
 *     // Handle specific event types
 *     if (evt.type === 'user.created') {
 *       console.log('New user created:', evt.data.id);
 *       // Handle user creation
 *     }
 *
 *     return new Response('Success', { status: 200 });
 *   } catch (err) {
 *     console.error('Webhook verification failed:', err);
 *     return new Response('Webhook verification failed', { status: 400 });
 *   }
 * }
 * ```
 */
export declare function verifyWebhook(request: RequestLike, options?: VerifyWebhookOptions): Promise<import("@clerk/backend/webhooks").WebhookEvent>;
//# sourceMappingURL=webhooks.d.ts.map