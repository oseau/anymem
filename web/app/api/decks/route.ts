import { NextRequest, NextResponse } from "next/server";
// import { createDeck } from "@/lib/decks"

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description } = body;

  try {
    // const newDeck = await createDeck(name, description)
    const newDeck = { id: 123, name, description };
    console.log("body", { name, description });
    return NextResponse.json(newDeck, { status: 201 });
  } catch (error) {
    console.error("Error creating deck:", error);
    return NextResponse.json(
      { error: "Failed to create deck" },
      { status: 500 },
    );
  }
}

export interface Deck {
  id: number;
  name: string;
  cardCount: {
    learned: number;
    totalImported: number;
  };
  cardsDue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
}

const mockUserDecks: Deck[] = [
  {
    id: 1,
    name: "English Vocabulary",
    cardCount: { learned: 100, totalImported: 500 },
    cardsDue: { today: 20, thisWeek: 50, thisMonth: 100 },
  },
  {
    id: 2,
    name: "Countries Capitals",
    cardCount: { learned: 50, totalImported: 200 },
    cardsDue: { today: 10, thisWeek: 30, thisMonth: 60 },
  },
  {
    id: 3,
    name: "Calculus Formulas",
    cardCount: { learned: 60, totalImported: 200 },
    cardsDue: { today: 20, thisWeek: 30, thisMonth: 60 },
  },
];

export async function GET() {
  // Simulate a delay to mimic a real API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(mockUserDecks);
}
