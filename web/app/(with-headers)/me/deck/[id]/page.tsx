import { headers } from "next/headers";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import UserDeckPage from "@/app/(with-headers)/[lang]/me/deck/[id]/page";

export default async function RootMyDeckPage({
  params,
}: {
  params: { id: string };
}) {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;
  const dict = await getDictionary(detectedLocale);
  return <UserDeckPage params={{ dict: dict, id: params.id }} />;
}
