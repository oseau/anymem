"use server";

import { getClerkUserID } from "@/lib/auth";
import { createSupabaseClient } from "@/lib/supabase";

export async function getDueCards(deckId: string) {
  const supabase = createSupabaseClient();
  const clerkUserID = await getClerkUserID();
  const { data: cards, error } = await supabase
    .from("decks")
    .select("cards(id, front, back)")
    .eq("id", deckId)
    .eq("clerk_user_id", clerkUserID) // only get user's own cards
    .lte("cards.due", new Date().toISOString())
    .single();
  if (error) {
    console.error("Error fetching due cards:", error);
    return [];
  }
  return cards.cards;
}
