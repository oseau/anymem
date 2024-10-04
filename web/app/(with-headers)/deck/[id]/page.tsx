import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import UserDeckPage from "@/app/(with-headers)/[lang]/deck/[id]/page";

export default async function RootUserDeckPage({
  params,
}: {
  params: { id: string };
}) {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;
  return <UserDeckPage params={{ lang: detectedLocale, id: params.id }} />;
}
