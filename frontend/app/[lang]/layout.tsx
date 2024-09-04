import type { Metadata } from "next";
import { i18n, type Locale } from "../../i18n-config";
import "../globals.css";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "AnyMem",
  description: "Memorize anything with AnyMem",
};
