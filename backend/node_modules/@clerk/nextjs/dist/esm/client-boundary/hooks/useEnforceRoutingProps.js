import "../../chunk-BUSYA2B4.js";
import { useRoutingProps } from "@clerk/clerk-react/internal";
import { useEnforceCatchAllRoute } from "./useEnforceCatchAllRoute";
import { usePathnameWithoutCatchAll } from "./usePathnameWithoutCatchAll";
function useEnforceCorrectRoutingProps(componentName, props, requireSessionBeforeCheck = true) {
  const path = usePathnameWithoutCatchAll();
  const routingProps = useRoutingProps(componentName, props, { path });
  useEnforceCatchAllRoute(componentName, path, routingProps.routing, requireSessionBeforeCheck);
  return routingProps;
}
export {
  useEnforceCorrectRoutingProps
};
//# sourceMappingURL=useEnforceRoutingProps.js.map