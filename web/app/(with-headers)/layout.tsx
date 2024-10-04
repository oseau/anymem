import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/get-dictionary";
import DotPattern from "@/components/magicui/dot-pattern";
import { type Locale, i18n } from "@/i18n-config";
import "@/app/globals.css";
import { headers } from "next/headers";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { NavLinks } from "@/components/NavLinks";

export const metadata: Metadata = {
  title: "AnyMem",
  description: "Memorize anything with AnyMem",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;
  const localeSource = headersList.get("x-locale-source") || "detection";
  const i18nPrefix = localeSource === "url" ? `/${detectedLocale}` : "";
  const dict = await getDictionary(detectedLocale);

  return (
    <ClerkProvider>
      <html lang={detectedLocale}>
        <body>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans relative">
            <DotPattern className="absolute inset-0 z-0 opacity-50" />
            <header className="bg-white shadow-md py-2 relative z-10">
              <nav className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
                <Link href={`${i18nPrefix}/`}>
                  <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
                    <span>{dict.title}</span>
                  </h1>
                </Link>
                <NavLinks dict={dict} i18nPrefix={i18nPrefix} />
              </nav>
            </header>

            <main className="flex-grow container mx-auto my-6 content-center max-w-4xl relative z-10">
              {children}
            </main>

            <footer className="bg-gray-800 text-white py-2">
              <div className="container mx-auto px-4 max-w-6xl text-center">
                <p>{dict.footer.copyright}</p>
              </div>
            </footer>
          </div>
          <TailwindIndicator />
        </body>
      </html>
    </ClerkProvider>
  );
}
