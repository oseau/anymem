import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { UserDeckList } from "@/components/UserDeckList";
import { CreateDeckForm } from "@/components/CreateDeckForm";

export default async function UserDecksPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{dict.decks.myDecks}</h1>
        <CreateDeckForm params={{ dict }} />
      </div>
      <UserDeckList params={{ dict }} />
    </div>
  );
}
