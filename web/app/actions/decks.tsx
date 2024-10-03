"use server";

import { getClerkUserID } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { createSupabaseClient } from "@/lib/supabase";


export async function createDeck(title: string) {
  const supabase = createSupabaseClient();
  try {
    const clerkUserID = await getClerkUserID();
    const { error } = await supabase.from("decks").insert({
      title,
      clerk_user_id: clerkUserID,
    });
    if (error) {
      console.error("Error creating deck:", error);
      return { error: "Failed to create deck" };
    }
    revalidatePath("/decks");
    return { error: null };
  } catch (error) {
    console.error("Error creating deck:", error);
    return { error: "Failed to create deck" };
  }
}

export async function getDecks() {
  const supabase = createSupabaseClient();
  const clerkUserID = await getClerkUserID();
  const { data: decksWithCounts, error } = await supabase
    .from("decks")
    .select(
      `
    id, 
    title,
    cards:cards(count)
  `,
    )
    .eq("clerk_user_id", clerkUserID)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching decks:", error);
    return [];
  }
  return decksWithCounts.map((deck) => ({
    id: deck.id,
    title: deck.title,
    cardCount: { learned: 0, totalImported: deck.cards[0].count },
    cardsDue: { today: 0, thisWeek: 0, thisMonth: 0 },
    cards: [],
  }));
}

export async function updateDeck(id: string, title: string) {
  const supabase = createSupabaseClient();
  const clerkUserID = await getClerkUserID();
  const { error } = await supabase
    .from("decks")
    .update({ title })
    .eq("id", id)
    .eq("clerk_user_id", clerkUserID);
  if (error) {
    console.error("Error updating deck:", error);
    return { error: "Failed to update deck" };
  }
  revalidatePath("/decks");
  return { error: null };
}

export async function deleteDeck(id: string) {
  const supabase = createSupabaseClient();
  const clerkUserID = await getClerkUserID();
  const { error } = await supabase
    .from("decks")
    .delete()
    .eq("id", id)
    .eq("clerk_user_id", clerkUserID);
  if (error) {
    console.error("Error deleting deck:", error);
    return { error: "Failed to delete deck" };
  }
  revalidatePath("/decks");
  return { error: null };
}

export async function getUserDeckCards(deckId: string) {
  const supabase = createSupabaseClient();
  const clerkUserID = await getClerkUserID();
  const { data: cards, error } = await supabase
    .from("cards")
    .select(
      `id, front, back,
      decks!inner()`,
    // NOTE:
    // we can use `...decks!inner(clerk_user_id)` to expose the `clerk_user_id` to result
    )
    .eq("deck_id", deckId)
    .eq("decks.clerk_user_id", clerkUserID);

  if (error) {
    console.error("Error fetching deck cards:", error);
    return { cards: [] };
  }
  return { cards };
}

export async function getSharedDecks() {
  const supabase = createSupabaseClient();
  // Fetch decks with card counts in a single query
  const { data: decksWithCounts, error } = await supabase
    .from("decks")
    .select(
      `
      id, 
      title,
      cards:cards(count)
    `,
    )
    .eq("clerk_user_id", process.env.ADMIN_CLERK_USER_ID!)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching shared decks:", error);
    return [];
  }

  // Format the result
  const formattedDecks = decksWithCounts.map((deck) => ({
    id: deck.id,
    title: deck.title,
    cardCount: deck.cards[0].count,
  }));

  return formattedDecks;
}
