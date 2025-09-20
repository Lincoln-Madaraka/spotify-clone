import "../chunk-BUSYA2B4.js";
import { eventFrameworkMetadata } from "@clerk/shared/telemetry";
import { useClerk } from "../client-boundary/hooks";
import { usePagesRouter } from "../client-boundary/hooks/usePagesRouter";
const RouterTelemetry = () => {
  var _a, _b;
  const clerk = useClerk();
  const { pagesRouter } = usePagesRouter();
  (_b = clerk.telemetry) == null ? void 0 : _b.record(
    eventFrameworkMetadata({
      router: pagesRouter ? "pages" : "app",
      ...((_a = globalThis == null ? void 0 : globalThis.next) == null ? void 0 : _a.version) ? { nextjsVersion: globalThis.next.version } : {}
    })
  );
  return null;
};
export {
  RouterTelemetry
};
//# sourceMappingURL=router-telemetry.js.map