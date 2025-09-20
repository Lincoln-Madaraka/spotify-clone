import type { RoutingStrategy } from '@clerk/types';
/**
 * This ugly hook  enforces that the Clerk components are mounted in a catch-all route
 * For pages router, we can parse the pathname we get from the useRouter hook
 * For app router, there is no reliable way to do the same check right now, so we
 * fire a request to a path under window.location.href and we check whether the path
 * exists or not
 */
export declare const useEnforceCatchAllRoute: (component: string, path: string, routing?: RoutingStrategy, requireSessionBeforeCheck?: boolean) => void;
//# sourceMappingURL=useEnforceCatchAllRoute.d.ts.map