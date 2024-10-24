import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import DecksPage from "../[lang]/shared-decks/page";

export default async function RootDecksPage() {
  const headersList = await headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;

  return <DecksPage params={{ lang: detectedLocale }} />;
}
