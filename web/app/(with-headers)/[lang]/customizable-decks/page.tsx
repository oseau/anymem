import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { LayersIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function CustomizableDecksPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 flex items-center">
        <LayersIcon className="w-10 h-10 mr-3" />
        {dictionary.features.customizableDecks.title}
      </h1>
      <p className="text-xl mb-12">
        {dictionary.features.customizableDecks.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              {dictionary.features.customizableDecks.benefits.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {dictionary.features.customizableDecks.benefits.list.map(
                (benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircledIcon className="w-6 h-6 mr-2 text-green-500 flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ),
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              {dictionary.features.customizableDecks.howTo.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-6 space-y-4">
              {dictionary.features.customizableDecks.howTo.steps.map(
                (step, index) => (
                  <li key={index} className="pl-2">
                    {step}
                  </li>
                ),
              )}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
