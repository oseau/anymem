import { headers } from "next/headers";
import { i18n, type Locale } from "@/i18n-config";
import DecksPage from "../[lang]/decks/page";

export default async function RootDecksPage() {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;

  return <DecksPage params={{ lang: detectedLocale }} />;
}
