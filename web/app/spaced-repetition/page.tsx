import { headers } from "next/headers";
import { i18n, type Locale } from "@/i18n-config";
import SpacedRepetitionPage from "../[lang]/spaced-repetition/page";

export default async function RootSpacedRepetitionPage() {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;

  return <SpacedRepetitionPage params={{ lang: detectedLocale }} />;
}
