import { headers } from "next/headers";
import { i18n, type Locale } from "@/i18n-config";
import CustomizableDecksPage from "../[lang]/customizable-decks/page";

export default async function RootCustomizableDecksPage() {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;

  return <CustomizableDecksPage params={{ lang: detectedLocale }} />;
}