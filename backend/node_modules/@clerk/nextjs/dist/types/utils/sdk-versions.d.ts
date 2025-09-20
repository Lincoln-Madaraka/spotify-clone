declare const isNext13: boolean;
/**
 * Those versions are affected by a bundling issue that will break the application if `node:fs` is used inside a server function.
 * The affected versions are >=next@13.5.4 and <=next@14.0.4
 */
declare const isNextWithUnstableServerActions: boolean;
export { isNext13, isNextWithUnstableServerActions };
//# sourceMappingURL=sdk-versions.d.ts.map