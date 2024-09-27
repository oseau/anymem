import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Deck {
  id: number;
  title: string;
  cardCount: number;
  progress: number;
}

const decks: Deck[] = [
  { id: 1, title: "Essential English", cardCount: 5000, progress: 20 },
  {
    id: 2,
    title: "Essential English (Reverse)",
    cardCount: 5000,
    progress: 20,
  },
  { id: 3, title: "Countries Capitals", cardCount: 195, progress: 50 },
  {
    id: 4,
    title: "Countries Capitals (Reverse)",
    cardCount: 195,
    progress: 50,
  },
  { id: 5, title: "Calculus Formulas", cardCount: 50, progress: 75 },
];

export default async function DecksPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-3xl font-bold mb-8">{dict.decks.myDecks}</h1>
    <div >
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <Card
              key={deck.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle>{deck.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  {dict.decks.totalCount.replace(
                    "{count}",
                    deck.cardCount.toString(),
                  )}
                </p>
                <Progress value={deck.progress} className="w-full" />
                <p className="mt-2 text-sm text-gray-600">
                  {dict.decks.progress.replace(
                    "{progress}",
                    deck.progress.toString(),
                  )}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
