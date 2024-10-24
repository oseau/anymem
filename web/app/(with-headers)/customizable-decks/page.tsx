import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import CustomizableDecksPage from "../[lang]/customizable-decks/page";

export default async function RootCustomizableDecksPage() {
  const headersList = await headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;

  return <CustomizableDecksPage params={{ lang: detectedLocale }} />;
}
