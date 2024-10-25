import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type Dictionary } from "@/get-dictionary";
import { getDecks } from "@/app/actions/decks";
import { EditDeckForm } from "@/components/EditDeckForm";
import { DeleteDeckDialog } from "@/components/DeleteDeckDialog";

export async function UserDeckList({
  params: { dict },
}: {
  params: { dict: Dictionary };
}) {
  const decks = await getDecks();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {decks.map((deck) => (
        <Card
          key={deck.id}
          className="shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader>
            <CardTitle>{deck.title}</CardTitle>
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
                <Link href={`/deck/${deck.id}`}>{dict.decks.browseCards}</Link>
              </Button>
              <Button asChild>
                <Link href={`/review/${deck.id}`}>
                  {dict.decks.revisitDeck}
                </Link>
              </Button>
              <div className="flex justify-between mt-2">
                <EditDeckForm deck={deck} dict={dict} />
                <DeleteDeckDialog deck={deck} dict={dict} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
