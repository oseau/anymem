import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import SharedDeckPage from "@/app/(with-headers)/[lang]/shared-deck/[id]/page";
import { getDictionary } from "@/get-dictionary";

export default async function RootSharedDeckPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;
  const dict = await getDictionary(detectedLocale);
  return <SharedDeckPage params={{ dict, id }} />;
}