/**
 * Attention: Only import this module when the node runtime is used.
 * We are using conditional imports to mitigate bundling issues with Next.js server actions on version prior to 14.1.0.
 */
import nodeRuntime from '#safe-node-apis';
declare const nodeFsOrThrow: () => NonNullable<typeof nodeRuntime.fs>;
declare const nodePathOrThrow: () => NonNullable<typeof nodeRuntime.path>;
declare const nodeCwdOrThrow: () => NonNullable<typeof nodeRuntime.cwd>;
export { nodeCwdOrThrow, nodeFsOrThrow, nodePathOrThrow };
//# sourceMappingURL=utils.d.ts.map