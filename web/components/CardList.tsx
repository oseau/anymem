import { EmptyDeckMessage } from "./EmptyDeckMessage";
import { type Dictionary } from "@/get-dictionary";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function CardList({
  deck,
  dict,
}: {
  deck: { title: string; cards: { front: string; back: string }[] };
  dict: Dictionary;
}) {
  // empty deck cound be a user deck or deck not owned by user, or wrong deckId
  if (!deck || deck.cards.length === 0) {
    return <EmptyDeckMessage dict={dict} />;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{deck.title}</h1>
      <div className="space-y-4 overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{dict.deckPage.frontContent}</TableHead>
              <TableHead>{dict.deckPage.backContent}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deck.cards.map((card, index) => (
              <CardItem key={index} card={card} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function CardItem({ card }: { card: { front: string; back: string } }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{card.front}</TableCell>
      <TableCell>{card.back}</TableCell>
    </TableRow>
  );
}
