import { Suspense } from "react";
import { Dictionary } from "@/get-dictionary";
import { CardList } from "@/components/CardList";
import { Spinner } from "@/components/ui/spinner";
import { i18n } from "@/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function UserDeckPage({
  params: { dict, id },
}: {
  params: { dict: Dictionary; id: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{dict.deckPage.title}</h1>
      <Suspense fallback={<Spinner />}>
        <CardList deckId={id} dict={dict} />
      </Suspense>
    </div>
  );
}
