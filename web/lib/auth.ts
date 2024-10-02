"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

export async function getClerkUserID() {
  const { userId: clerkUserID } = auth();
  if (!clerkUserID) {
    throw new Error("User not authenticated");
  }
  return clerkUserID;
}
