"use server";
import { cookies } from "next/headers";
async function invalidateCacheAction() {
  void (await cookies()).delete(`__clerk_invalidate_cache_cookie_${Date.now()}`);
}
export {
  invalidateCacheAction
};
