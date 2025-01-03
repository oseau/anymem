import { auth, currentUser } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId: clerkID } = auth();

  if (!clerkID) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseClient();

  // Fetch user data from Supabase
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("clerk_user_id, email")
    .eq("clerk_user_id", clerkID)
    .single();

  if (userError) {
    // Continue without Supabase data if there's an error
    console.error("Error fetching user data:", userError);
    if (userError.code === "PGRST116") {
      // User not found, create a new user in Supabase
      const user = await currentUser();
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert({
          clerk_user_id: clerkID,
          email: user?.primaryEmailAddress?.emailAddress || "UNKNOWN",
        })
        .select("clerk_user_id, email")
        .single();
      if (createError) {
        console.error("Error creating user in Supabase:", createError);
        return NextResponse.json(
          { error: "Error creating user in Supabase" },
          { status: 500 },
        );
      }
      newUser!.email = newUser!.email.replace(/(.{2})(.*)(@.*)/, "$1***$3"); // redact email partially
      return NextResponse.json(newUser);
    }
  }
  userData!.email = userData!.email.replace(/(.{2})(.*)(@.*)/, "$1***$3"); // redact email partially
  return NextResponse.json(userData);
}
