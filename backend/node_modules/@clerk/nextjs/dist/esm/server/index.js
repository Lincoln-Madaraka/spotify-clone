import "../chunk-BUSYA2B4.js";
import { createRouteMatcher } from "./routeMatcher";
import { verifyToken, createClerkClient } from "@clerk/backend";
import { clerkClient } from "./clerkClient";
import { getAuth } from "./createGetAuth";
import { buildClerkProps } from "./buildClerkProps";
import { auth } from "../app-router/server/auth";
import { currentUser } from "../app-router/server/currentUser";
import { clerkMiddleware } from "./clerkMiddleware";
import { reverificationErrorResponse, reverificationError } from "@clerk/backend/internal";
export {
  auth,
  buildClerkProps,
  clerkClient,
  clerkMiddleware,
  createClerkClient,
  createRouteMatcher,
  currentUser,
  getAuth,
  reverificationError,
  reverificationErrorResponse,
  verifyToken
};
//# sourceMappingURL=index.js.map