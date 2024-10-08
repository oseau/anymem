import { getDictionary } from "@/get-dictionary";
import { CardList } from "@/components/CardList";
import { Locale, i18n } from "@/i18n-config";
import { getUserDeckCards } from "@/app/actions/decks";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function UserDeckPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const dict = await getDictionary(lang);
  const deck = await getUserDeckCards(id);
  if (!deck) {
    notFound();
  }
  return <CardList deck={deck} dict={dict} />;
}
