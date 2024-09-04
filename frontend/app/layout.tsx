import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { languages } from "../i18n-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnyMem",
  description: "Learn and memorize anything with AnyMem",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }));
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
