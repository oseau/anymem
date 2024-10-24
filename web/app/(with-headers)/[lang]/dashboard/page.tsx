import { type Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function DashboardPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">{dict.dashboard.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{dict.dashboard.progress}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={(0 / 1001) * 100} className="mb-2" />
              <p>
                {0} / {1001} {dict.dashboard.cardsLearned}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{dict.dashboard.cardsToReview}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p>
                  <span className="font-semibold">
                    {dict.decks.cardsDue.today}:
                  </span>{" "}
                  <span className="text-2xl font-bold">{1001}</span>
                </p>
                <p>
                  <span className="font-semibold">
                    {dict.decks.cardsDue.thisWeek}:
                  </span>{" "}
                  {1001}
                </p>
                <p>
                  <span className="font-semibold">
                    {dict.decks.cardsDue.thisMonth}:
                  </span>{" "}
                  {1001}
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href={`/review`}>{dict.dashboard.startReview}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{dict.dashboard.streak}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {1001}
                <span className="ml-2 text-xl font-normal">
                  {dict.dashboard.days}
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">{dict.decks.myDecks}</h2>
        <Button asChild className="w-full md:w-auto">
          <Link href={`/decks`} className="flex items-center justify-center">
            {dict.dashboard.viewAllDecks}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
