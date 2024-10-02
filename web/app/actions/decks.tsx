"use server";

import { getClerkUserID } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { createSupabaseClient } from "@/lib/supabase";

const mockUserDecks = [
  {
    id: "1",
    name: "English Vocabulary",
    cardCount: { learned: 100, totalImported: 500 },
    cardsDue: { today: 20, thisWeek: 50, thisMonth: 100 },
    cards: [
      { id: "1", front: "Hello", back: "World" },
      { id: "2", front: "Foo", back: "Bar" },
      { id: "3", front: "Baz", back: "Qux" },
    ],
  },
  {
    id: "2",
    name: "Countries Capitals",
    cardCount: { learned: 50, totalImported: 200 },
    cardsDue: { today: 10, thisWeek: 30, thisMonth: 60 },
    cards: [
      { id: "4", front: "London", back: "England" },
      { id: "5", front: "Paris", back: "France" },
      { id: "6", front: "Rome", back: "Italy" },
    ],
  },
  {
    id: "3",
    name: "Calculus Formulas",
    cardCount: { learned: 60, totalImported: 200 },
    cardsDue: { today: 20, thisWeek: 30, thisMonth: 60 },
    cards: [
      { id: "7", front: "f(x) = x^2", back: "f'(x) = 2x" },
      { id: "8", front: "f(x) = sin(x)", back: "f'(x) = cos(x)" },
      { id: "9", front: "f(x) = e^x", back: "f'(x) = e^x" },
    ],
  },
];

export type Card = (typeof mockUserDecks)[number]["cards"][number];

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
  try {
    const deck = mockUserDecks.find((deck) => deck.id === deckId);
    if (!deck) {
      return { error: "Deck not found" };
    }
    const cards = deck.cards;
    return { cards };
  } catch (error) {
    console.error("Error fetching deck cards:", error);
    return { error: "Failed to fetch deck cards" };
  }
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
