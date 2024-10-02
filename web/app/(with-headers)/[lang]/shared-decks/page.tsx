import { type Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSharedDecks } from "@/app/actions/decks";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function DecksPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  const decks = await getSharedDecks();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-3xl font-bold mb-8">{dict.decks.title}</h1>
      <div>
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <Card
                key={deck.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle>{deck.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    {dict.decks.totalCount.replace(
                      "{count}",
                      deck.cardCount.toString(),
                    )}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
