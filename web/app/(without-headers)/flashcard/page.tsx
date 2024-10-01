import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import FlashcardPage from "../[lang]/flashcard/page";

export default async function RootFlashcardPage() {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;

  return <FlashcardPage params={{ lang: detectedLocale }} />;
}
