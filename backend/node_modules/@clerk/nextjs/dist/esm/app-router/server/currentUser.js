import "../../chunk-BUSYA2B4.js";
import { clerkClient } from "../../server/clerkClient";
import { auth } from "./auth";
async function currentUser(opts) {
  require("server-only");
  const { userId } = await auth({ treatPendingAsSignedOut: opts == null ? void 0 : opts.treatPendingAsSignedOut });
  if (!userId) {
    return null;
  }
  return (await clerkClient()).users.getUser(userId);
}
export {
  currentUser
};
//# sourceMappingURL=currentUser.js.map