import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import UserDeckPage from "@/app/(with-headers)/[lang]/deck/[id]/page";

export default async function RootUserDeckPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const headersList = await headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;
  return <UserDeckPage params={{ lang: detectedLocale, id: params.id }} />;
}
