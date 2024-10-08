"use server";

import { auth } from "@clerk/nextjs/server";

export async function getClerkUserID() {
  const { userId: clerkUserID } = auth();
  if (!clerkUserID) {
    throw new Error("User not authenticated");
  }
  return clerkUserID;
}
