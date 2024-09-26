import { headers } from "next/headers";
import { i18n, type Locale } from "@/i18n-config";
import FlashcardPage from "../[lang]/flashcard/page";

export default async function RootFlashcardPage() {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;

  return <FlashcardPage params={{ lang: detectedLocale }} />;
}
