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
    .eq("clerk_user_id", clerkUserID) // only get user's own decks
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
    .eq("clerk_user_id", clerkUserID); // only update user's own deck
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
    .eq("clerk_user_id", clerkUserID); // only delete user's own deck
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
  const { data, error } = await supabase
    .from("decks")
    .select(`title, cards(front, back)`)
    .eq("id", deckId)
    .eq("clerk_user_id", clerkUserID) // only get user's own deck
    .single();

  if (error) {
    console.error("Error fetching deck cards:", error);
    return null;
  }
  return { title: data.title, cards: data.cards };
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
    .eq("shared", true) // only get shared decks
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

export async function getSharedDeckById(id: string) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("decks")
    .select(
      `
    title,
    cards (
      front,
      back
    )
  `,
    )
    .eq("id", id)
    .eq("shared", true) // only get shared decks
    .single();

  if (error) {
    console.error("Error fetching shared deck:", error);
    return null;
  }
  return { title: data?.title, cards: data?.cards };
}

export async function cloneDeck(id: string) {
  const supabase = createSupabaseClient();
  const clerkUserID = await getClerkUserID();
  const { data, error } = await supabase
    .from("decks")
    .select("title, cards(front, back)")
    .eq("id", id)
    .eq("shared", true) // only clone shared decks
    .neq("clerk_user_id", clerkUserID) // prevent cloning own deck
    .single();
  console.log("cloning deck data:", data);
  if (error) {
    console.error("Error cloning deck:", error);
    return { error: "Failed to clone deck" };
  }
  return { error: null };
}
