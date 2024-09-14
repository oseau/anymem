import { headers } from "next/headers";
import { i18n, type Locale } from "@/i18n-config";
import MultiPlatformPage from "../[lang]/multi-platform/page";

export default async function RootMultiPlatformPage() {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;

  return <MultiPlatformPage params={{ lang: detectedLocale }} />;
}
