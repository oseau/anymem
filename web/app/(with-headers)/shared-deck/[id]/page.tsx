import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import SharedDeckPage from "@/app/(with-headers)/[lang]/shared-deck/[id]/page";

export default async function RootSharedDeckPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;
  return <SharedDeckPage params={{ lang: detectedLocale, id }} />;
}
