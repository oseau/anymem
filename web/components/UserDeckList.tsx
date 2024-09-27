"use client";

import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { type Dictionary } from "@/get-dictionary";
import { type Deck } from "@/app/api/decks/route";
import { Spinner } from "@/components/ui/spinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function UserDeckList({
  params: { dict },
}: {
  params: { dict: Dictionary };
}) {
  const { data: decks, error } = useSWR<Deck[]>("/api/decks", fetcher);

  if (error) return <div>{dict.common.error}</div>;
  if (!decks) return <Spinner />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {decks.map((deck) => (
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
  );
}
