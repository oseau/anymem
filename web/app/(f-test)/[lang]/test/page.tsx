import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Page({ params }: { params: { lang: Locale } }) {
  const lang = params.lang ?? i18n.defaultLocale;
  const dict = await getDictionary(lang);
  return <h1>{dict.header.comingSoon}</h1>;
}
