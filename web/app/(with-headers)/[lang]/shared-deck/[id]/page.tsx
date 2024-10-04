import { getDictionary } from "@/get-dictionary";
import { getSharedDeckById } from "@/app/actions/decks";
import { notFound } from "next/navigation";
import { CardList } from "@/components/CardList";
import { Button } from "@/components/ui/button";
import { Locale, i18n } from "@/i18n-config";

export async function generateStaticParams() {
  // TODO: also generate shared deck ids
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function SharedDeckPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const dict = await getDictionary(lang);
  const deck = await getSharedDeckById(id);

  if (!deck) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <CardList deck={deck} dict={dict} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button variant="outline" className="w-full">
          {dict.sharedDeck.importCards}
        </Button>
        <Button className="w-full">{dict.sharedDeck.cloneDeck}</Button>
      </div>
    </div>
  );
}
