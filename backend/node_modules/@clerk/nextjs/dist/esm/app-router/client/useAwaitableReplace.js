"use client";
import "../../chunk-BUSYA2B4.js";
import { useRouter } from "next/navigation";
import { useInternalNavFun } from "./useInternalNavFun";
const useAwaitableReplace = () => {
  const router = useRouter();
  return useInternalNavFun({
    windowNav: typeof window !== "undefined" ? window.history.replaceState.bind(window.history) : void 0,
    routerNav: router.replace.bind(router),
    name: "replace"
  });
};
export {
  useAwaitableReplace
};
//# sourceMappingURL=useAwaitableReplace.js.map