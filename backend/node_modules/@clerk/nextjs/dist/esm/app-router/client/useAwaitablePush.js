"use client";
import "../../chunk-BUSYA2B4.js";
import { useRouter } from "next/navigation";
import { useInternalNavFun } from "./useInternalNavFun";
const useAwaitablePush = () => {
  const router = useRouter();
  return useInternalNavFun({
    windowNav: typeof window !== "undefined" ? window.history.pushState.bind(window.history) : void 0,
    routerNav: router.push.bind(router),
    name: "push"
  });
};
export {
  useAwaitablePush
};
//# sourceMappingURL=useAwaitablePush.js.map