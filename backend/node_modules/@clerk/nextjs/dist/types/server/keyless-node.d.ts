import type { AccountlessApplication } from '@clerk/backend';
export declare function safeParseClerkFile(): AccountlessApplication | undefined;
declare function createOrReadKeyless(): Promise<AccountlessApplication | null>;
declare function removeKeyless(): undefined;
export { createOrReadKeyless, removeKeyless };
//# sourceMappingURL=keyless-node.d.ts.map