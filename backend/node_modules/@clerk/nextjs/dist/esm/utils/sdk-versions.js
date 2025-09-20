import "../chunk-BUSYA2B4.js";
import nextPkg from "next/package.json";
const isNext13 = nextPkg.version.startsWith("13.");
const isNextWithUnstableServerActions = isNext13 || nextPkg.version.startsWith("14.0");
export {
  isNext13,
  isNextWithUnstableServerActions
};
//# sourceMappingURL=sdk-versions.js.map