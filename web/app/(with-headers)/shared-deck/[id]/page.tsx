import { headers } from "next/headers";
import { type Locale, i18n } from "@/i18n-config";
import SharedDeckPage from "@/app/(with-headers)/[lang]/shared-deck/[id]/page";

export default async function RootSharedDeckPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;

  const {
    id
  } = params;

  const headersList = await headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;
  return <SharedDeckPage params={{ lang: detectedLocale, id }} />;
}
