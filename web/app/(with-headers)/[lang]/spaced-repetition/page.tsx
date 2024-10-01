import { type Locale, i18n } from "@/i18n-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { RetentionCurve } from "@/components/retention-curve";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function SpacedRepetitionPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        {dictionary.features.spacedRepetition.title}
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            {dictionary.features.spacedRepetition.whatIs.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{dictionary.features.spacedRepetition.whatIs.description}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {dictionary.features.spacedRepetition.algorithm.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{dictionary.features.spacedRepetition.algorithm.description}</p>
            <ul className="list-disc list-inside mt-2">
              {dictionary.features.spacedRepetition.algorithm.features.map(
                (feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ),
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {dictionary.features.spacedRepetition.howItWorks.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside">
              {dictionary.features.spacedRepetition.howItWorks.steps.map(
                (step: string, index: number) => (
                  <li key={index}>{step}</li>
                ),
              )}
            </ol>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 w-full bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          {dictionary.features.spacedRepetition.retentionCurve.title}
        </h2>
        <div className="w-full h-[400px]">
          <RetentionCurve />
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>
            {dictionary.features.spacedRepetition.chartExplanation.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {dictionary.features.spacedRepetition.chartExplanation.description}
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              {
                dictionary.features.spacedRepetition.chartExplanation
                  .optimizedReviews
              }
            </li>
            <li>
              {
                dictionary.features.spacedRepetition.chartExplanation
                  .avoidEarlyReviews
              }
            </li>
            <li>
              {
                dictionary.features.spacedRepetition.chartExplanation
                  .maximizePerformance
              }
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>
            {dictionary.features.spacedRepetition.benefits.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            {dictionary.features.spacedRepetition.benefits.list.map(
              (benefit: string, index: number) => (
                <li key={index}>{benefit}</li>
              ),
            )}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
