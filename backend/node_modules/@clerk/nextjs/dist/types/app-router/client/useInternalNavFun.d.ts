import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
export declare const useInternalNavFun: (props: {
    windowNav: typeof window.history.pushState | typeof window.history.replaceState | undefined;
    routerNav: AppRouterInstance["push"] | AppRouterInstance["replace"];
    name: string;
}) => NavigationFunction;
//# sourceMappingURL=useInternalNavFun.d.ts.map