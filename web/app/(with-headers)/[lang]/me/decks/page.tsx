import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

interface Deck {
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

// Mock data - replace with actual data fetching logic
const mockUserDecks: Deck[] = [
  {
    id: 1,
    name: "English Vocabulary",
    cardCount: { learned: 100, totalImported: 500 },
    cardsDue: { today: 20, thisWeek: 50, thisMonth: 100 },
  },
  {
    id: 2,
    name: "Spanish Phrases",
    cardCount: { learned: 50, totalImported: 200 },
    cardsDue: { today: 10, thisWeek: 30, thisMonth: 60 },
  },
  // Add more mock decks as needed
];

export default async function UserDecksPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{dict.decks.myDecks}</h1>
        <Button asChild>
          <Link href={`/me/decks/new`}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {dict.decks.createNewDeck}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockUserDecks.map((deck) => (
          <Card key={deck.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{deck.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                {dict.decks.cardCount
                  .replace("{learned}", deck.cardCount.learned.toString())
                  .replace("{total}", deck.cardCount.totalImported.toString())}
              </p>
              <p className="mb-4 text-sm">
                {dict.decks.cardsDue.today}: {deck.cardsDue.today}<br />
                {dict.decks.cardsDue.thisWeek}: {deck.cardsDue.thisWeek}<br />
                {dict.decks.cardsDue.thisMonth}: {deck.cardsDue.thisMonth}
              </p>
              <div className="flex flex-col space-y-2">
                <Button asChild variant="outline">
                  <Link href={`/me/deck/${deck.id}`}>
                    {dict.decks.browseCards}
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/review/deck/${deck.id}`}>
                    {dict.decks.revisitDeck}
                  </Link>
                </Button>
                <div className="flex justify-between mt-2">
                  <Button variant="ghost" size="sm" className="flex-1 mr-1">
                    <Edit className="mr-2 h-4 w-4" />
                    {dict.decks.editDeck}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 ml-1">
                    <Trash2 className="mr-2 h-4 w-4" />
                    {dict.decks.deleteDeck}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
