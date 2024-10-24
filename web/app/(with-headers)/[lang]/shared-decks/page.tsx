import { type Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSharedDecks } from "@/app/actions/decks";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function DecksPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dict = await getDictionary(lang);
  const decks = await getSharedDecks();

  return (
    <div className="flex flex-col items-center justify-center">
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
                <CardFooter className="flex justify-between">
                  <Button asChild>
                    <Link
                      href={`/shared-deck/${deck.id}`}
                      className="flex items-center justify-center"
                    >
                      {dict.decks.browseCards}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
