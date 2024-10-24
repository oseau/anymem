import { getDictionary } from "@/get-dictionary";
import Link from "next/link";
import { CardList } from "@/components/CardList";
import { Locale, i18n } from "@/i18n-config";
import { getUserDeckCards } from "@/app/actions/decks";

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
    return (
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="text-2xl font-bold">Not Found</h2>
        <p className="text-sm text-gray-500">
          Could not find requested resource
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300"
        >
          Return Home
        </Link>
      </div>
    );
  }
  return <CardList deck={deck} dict={dict} />;
}
