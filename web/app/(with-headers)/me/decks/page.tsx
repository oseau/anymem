import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import UserDecksPage from "@/app/(with-headers)/[lang]/me/decks/page";

export default async function RootMyDecksPage() {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;

  return <UserDecksPage params={{ lang: detectedLocale }} />;
}
