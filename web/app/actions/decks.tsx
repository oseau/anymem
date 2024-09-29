"use server";

import { revalidatePath } from "next/cache";

const mockUserDecks = [
  {
    id: "1",
    name: "English Vocabulary",
    cardCount: { learned: 100, totalImported: 500 },
    cardsDue: { today: 20, thisWeek: 50, thisMonth: 100 },
  },
  {
    id: "2",
    name: "Countries Capitals",
    cardCount: { learned: 50, totalImported: 200 },
    cardsDue: { today: 10, thisWeek: 30, thisMonth: 60 },
  },
  {
    id: "3",
    name: "Calculus Formulas",
    cardCount: { learned: 60, totalImported: 200 },
    cardsDue: { today: 20, thisWeek: 30, thisMonth: 60 },
  },
];

export async function createDeck(name: string) {
  try {
    const newDeck = {
      id: (mockUserDecks.length + 1).toString(),
      name,
      cardCount: { learned: 0, totalImported: 0 },
      cardsDue: { today: 0, thisWeek: 0, thisMonth: 0 },
    };
    console.log("New deck created:", { name });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    mockUserDecks.push(newDeck);
    revalidatePath("/me/decks");
    return { error: null };
  } catch (error) {
    console.error("Error creating deck:", error);
    return { error: "Failed to create deck" };
  }
}

export async function getDecks() {
  // Simulate a delay to mimic a real API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockUserDecks;
}

export async function updateDeck(id: string, name: string) {
  // use the mockUserDecks to update the deck name
  const deck = mockUserDecks.find((deck) => deck.id === id);
  if (deck) {
    deck.name = name;
  }
  revalidatePath("/me/decks");
  return { error: null };
}

export async function deleteDeck(id: string) {
  try {
    const index = mockUserDecks.findIndex((deck) => deck.id === id);
    if (index !== -1) {
      mockUserDecks.splice(index, 1);
    }
    revalidatePath("/me/decks");
    return { error: null };
  } catch (error) {
    console.error("Error deleting deck:", error);
    return { error: "Failed to delete deck" };
  }
}
