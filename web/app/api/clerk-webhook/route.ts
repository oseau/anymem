import { createSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = req.headers;
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;

  const supabase = createSupabaseClient();

  switch (eventType) {
    case "user.created":
      const { id, email_addresses, primary_email_address_id } =
        evt.data as UserJSON;
      const primaryEmailAddress = email_addresses.find(
        (email) => email.id === primary_email_address_id,
      );
      if (!primaryEmailAddress) {
        console.error("Primary email address not found");
        return NextResponse.json(
          { error: "Primary email address not found" },
          { status: 500 },
        );
      }
      const { error } = await supabase.from("users").insert({
        clerk_user_id: id,
        email: primaryEmailAddress.email_address,
      });

      if (error) {
        console.error("Error inserting user into Supabase:", error);
        return NextResponse.json(
          { error: "Error syncing user to database" },
          { status: 500 },
        );
      }

      return NextResponse.json(
        { message: "User synced successfully" },
        { status: 200 },
      );

    case "user.updated":
      // Handle user update logic here
      // TODO: Implement user update logic
      return NextResponse.json(
        { message: "User update handled" },
        { status: 200 },
      );

    case "user.deleted":
      // Handle user deletion logic here
      // TODO: Implement user deletion logic
      return NextResponse.json(
        { message: "User deletion handled" },
        { status: 200 },
      );

    default:
      console.log(`Unhandled event type: ${eventType}`);
      return NextResponse.json(
        { message: "Webhook received" },
        { status: 200 },
      );
  }
}
