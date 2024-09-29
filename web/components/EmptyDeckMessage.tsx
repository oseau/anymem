import Link from "next/link";
import { type Dictionary } from "@/get-dictionary";

export function EmptyDeckMessage({ dict }: { dict: Dictionary }) {
  return (
    <div className="text-center py-12">
      <p className="text-xl mb-4">{dict.deckPage.emptyDeckMessage}</p>
      <Link
        href={`/decks`}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {dict.deckPage.importCardsButton}
      </Link>
    </div>
  );
}
