import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import DashboardPage from "../[lang]/dashboard/page";

export default async function RootDashboardPage() {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;

  return <DashboardPage params={{ lang: detectedLocale }} />;
}
