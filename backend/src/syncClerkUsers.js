import dotenv from "dotenv";
dotenv.config();

import { clerkClient } from "@clerk/express";
import { connectDB } from "./lib/db.js";
import { User } from "./models/user.model.js";

const removeDuplicates = async () => {
  const allUsers = await User.find();
  const seen = new Set();

  for (const u of allUsers) {
    if (seen.has(u.clerkId)) {
      await User.deleteOne({ _id: u._id });
      console.log(`Removed duplicate user: ${u.fullName} (${u.clerkId})`);
    } else {
      seen.add(u.clerkId);
    }
  }
};

export const syncClerkUsers = async () => {
  await connectDB();
  console.log("MongoDB connected");

  await removeDuplicates();

  const clerkUsers = await clerkClient.users.getUserList();
  console.log(`Fetched ${clerkUsers.data.length} users from Clerk`);

  for (const cUser of clerkUsers.data) {
    const existing = await User.findOne({ clerkId: cUser.id });

    if (existing) {
      existing.fullName = cUser.fullName;
      existing.imageUrl = cUser.imageUrl;
      await existing.save();
      console.log(`Updated user: ${cUser.fullName}`);
    } else {
      // create new user
      await User.create({
        clerkId: cUser.id,
        fullName: cUser.fullName,
        imageUrl: cUser.imageUrl,
      });
      console.log(`Added new user: ${cUser.fullName}`);
    }
  }

  console.log("Sync complete!");
  process.exit(0);
};

if (import.meta.url === `file://${process.argv[1]}`) {
  syncClerkUsers().catch((err) => {
    console.error("Error syncing users:", err);
  });
}
