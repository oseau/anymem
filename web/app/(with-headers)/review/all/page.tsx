import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import ReviewAllPage from "@/app/(with-headers)/[lang]/review/all/page";

export default async function RootReviewAllPage({
  params,
}: {
  params: { id: string };
}) {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;
  return <ReviewAllPage />;
}
