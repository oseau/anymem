import { getDictionary } from "@/get-dictionary";
import { CreateDeckForm } from "@/components/CreateDeckForm";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { UserDeckList } from "@/components/UserDeckList";
import { type Locale, i18n } from "@/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function UserDecksPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dict = await getDictionary(lang);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{dict.decks.myDecks}</h1>
        <CreateDeckForm params={{ dict }} />
      </div>
      <Suspense fallback={<Spinner />}>
        <UserDeckList params={{ dict }} />
      </Suspense>
    </>
  );
}
