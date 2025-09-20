/**
 * Detects and reports environment drift between keyless configuration and environment variables.
 *
 * This function compares the Clerk keys stored in the keyless configuration file (.clerk/clerk.json)
 * with the keys set in environment variables (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY).
 * It only reports drift when there's an actual mismatch between existing keys, not when keys are simply missing.
 *
 * The function handles several scenarios and only reports drift in specific cases:
 * - **Normal keyless mode**: env vars missing but keyless file has keys → no drift (expected)
 * - **No configuration**: neither env vars nor keyless file have keys → no drift (nothing to compare)
 * - **Actual drift**: env vars exist and don't match keyless file keys → drift detected
 * - **Empty keyless file**: keyless file exists but has no keys → no drift (nothing to compare)
 *
 * Drift is only detected when:
 * 1. Both environment variables and keyless file contain keys
 * 2. The keys in environment variables don't match the keys in the keyless file
 *
 * Telemetry events are only fired once per application lifecycle using a flag file mechanism
 * to prevent duplicate reporting.
 *
 * @returns Promise<void> - Function completes silently, errors are logged but don't throw
 */
export declare function detectKeylessEnvDrift(): Promise<void>;
//# sourceMappingURL=keyless-telemetry.d.ts.map