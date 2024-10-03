import { EmptyDeckMessage } from "./EmptyDeckMessage";
import { type Dictionary } from "@/get-dictionary";
import { getUserDeckCards } from "@/app/actions/decks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export async function CardList({
  deckId,
  dict,
}: {
  deckId: string;
  dict: Dictionary;
}) {
  const { cards } = await getUserDeckCards(deckId);

  if (cards === undefined || cards.length === 0) {
    return <EmptyDeckMessage dict={dict} />;
  }

  return (
    <div className="space-y-4 overflow-hidden rounded-[0.5rem] border bg-background shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{dict.deckPage.frontContent}</TableHead>
            <TableHead>{dict.deckPage.backContent}</TableHead>
            <TableHead className="w-[100px]">{dict.deckPage.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cards.map((card) => (
            <CardItem key={card.id} card={card} dict={dict} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function CardItem({ card, dict }: { card: { id: string; front: string; back: string }; dict: Dictionary }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{card.front}</TableCell>
      <TableCell>{card.back}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">{dict.deckPage.openMenu}</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{dict.deckPage.actions}</DropdownMenuLabel>
            <DropdownMenuItem>{dict.deckPage.edit}</DropdownMenuItem>
            <DropdownMenuItem>{dict.deckPage.delete}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{dict.deckPage.review}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
