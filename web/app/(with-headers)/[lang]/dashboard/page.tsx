import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock data - replace with actual data fetching logic
const mockUserData = {
  totalCards: 500,
  cardsLearned: 350,
  cardsToReview: 75,
  streakDays: 15,
  upcomingReviews: [
    { id: 1, topic: "Biology", dueDate: "2024-03-15" },
    { id: 2, topic: "History", dueDate: "2024-03-16" },
    { id: 3, topic: "Mathematics", dueDate: "2024-03-17" },
  ],
};

export default async function DashboardPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{dictionary.dashboard.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.dashboard.progress}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={
                (mockUserData.cardsLearned / mockUserData.totalCards) * 100
              }
              className="mb-2"
            />
            <p>
              {mockUserData.cardsLearned} / {mockUserData.totalCards}{" "}
              {dictionary.dashboard.cardsLearned}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dictionary.dashboard.cardsToReview}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{mockUserData.cardsToReview}</p>
            <Button asChild className="mt-4">
              <Link href={`/${lang}/review`}>
                {dictionary.dashboard.startReview}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dictionary.dashboard.streak}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{mockUserData.streakDays}</p>
            <p>{dictionary.dashboard.days}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">
        {dictionary.dashboard.upcomingReviews}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockUserData.upcomingReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <CardTitle>{review.topic}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {dictionary.dashboard.dueDate}: {review.dueDate}
              </p>
              <Button asChild className="mt-4">
                <Link href={`/${lang}/review/${review.id}`}>
                  {dictionary.dashboard.reviewNow}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
