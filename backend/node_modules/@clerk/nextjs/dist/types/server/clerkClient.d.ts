/**
 * Constructs a BAPI client that accesses request data within the runtime.
 * Necessary if middleware dynamic keys are used.
 */
declare const clerkClient: () => Promise<import("@clerk/backend").ClerkClient>;
export { clerkClient };
//# sourceMappingURL=clerkClient.d.ts.map