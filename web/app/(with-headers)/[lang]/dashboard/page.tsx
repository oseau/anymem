import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock data - replace with actual data fetching logic
const mockUserData = {
  streakDays: 15,
  decks: [
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
    // Add more mock decks as needed
  ],
};

const totalCards = mockUserData.decks.reduce(
  (sum, deck) => sum + deck.cardCount.totalImported,
  0,
);
const totalLearned = mockUserData.decks.reduce(
  (sum, deck) => sum + deck.cardCount.learned,
  0,
);

export default async function DashboardPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{dict.dashboard.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{dict.dashboard.progress}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={(totalLearned / totalCards) * 100}
              className="mb-2"
            />
            <p>
              {totalLearned} / {totalCards} {dict.dashboard.cardsLearned}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.dashboard.cardsToReview}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <p>
                <span className="font-semibold">
                  {dict.decks.cardsDue.today}:
                </span>{" "}
                <span className="text-2xl font-bold">
                  {mockUserData.decks.reduce(
                    (sum, deck) => sum + deck.cardsDue.today,
                    0,
                  )}
                </span>
              </p>
              <p>
                <span className="font-semibold">
                  {dict.decks.cardsDue.thisWeek}:
                </span>{" "}
                {mockUserData.decks.reduce(
                  (sum, deck) => sum + deck.cardsDue.thisWeek,
                  0,
                )}
              </p>
              <p>
                <span className="font-semibold">
                  {dict.decks.cardsDue.thisMonth}:
                </span>{" "}
                {mockUserData.decks.reduce(
                  (sum, deck) => sum + deck.cardsDue.thisMonth,
                  0,
                )}
              </p>
            </div>
            <Button asChild className="w-full">
              <Link href={`/review`}>{dict.dashboard.startReview}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.dashboard.streak}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {mockUserData.streakDays}
              <span className="ml-2 text-xl font-normal">
                {dict.dashboard.days}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">{dict.decks.myDecks}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockUserData.decks.map((deck) => (
          <Card
            key={deck.id}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
          >
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
                {dict.decks.cardsDue.today}: {deck.cardsDue.today}
                <br />
                {dict.decks.cardsDue.thisWeek}: {deck.cardsDue.thisWeek}
                <br />
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
