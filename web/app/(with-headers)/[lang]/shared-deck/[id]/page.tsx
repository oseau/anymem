import { getDictionary } from "@/get-dictionary";
import { getSharedDeckById } from "@/app/actions/decks";
import { notFound } from "next/navigation";
import { CardList } from "@/components/CardList";
import { Locale, i18n } from "@/i18n-config";
import CloneButton from "@/components/clone-button";

export async function generateStaticParams() {
  // TODO: also generate shared deck ids
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function SharedDeckPage(
  props: {
    params: Promise<{ lang: Locale; id: string }>;
  }
) {
  const params = await props.params;

  const {
    lang,
    id
  } = params;

  const dict = await getDictionary(lang);
  const deck = await getSharedDeckById(id);

  if (!deck) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <CardList deck={deck} dict={dict} />
      <CloneButton id={id} label={dict.sharedDeck.cloneDeck} />
    </div>
  );
}
