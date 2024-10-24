import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import MultiPlatformPage from "../[lang]/multi-platform/page";

export default async function RootMultiPlatformPage() {
  const headersList = await headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;

  return <MultiPlatformPage params={{ lang: detectedLocale }} />;
}
