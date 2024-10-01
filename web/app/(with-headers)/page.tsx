import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import Page from "./[lang]/page";

export default async function RootPage() {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;
  const localeSource = headersList.get("x-locale-source") || "detection";

  return <Page params={{ lang: detectedLocale, localeSource }} />;
}
