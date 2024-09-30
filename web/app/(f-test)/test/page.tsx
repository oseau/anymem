import Page from "../[lang]/test/page";
import { i18n, type Locale } from "@/i18n-config";
import { headers } from "next/headers";

export default async function PageDefault() {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;
  return <Page params={{ lang: detectedLocale }} />;
}
