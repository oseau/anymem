import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import DotPattern from "@/components/magicui/dot-pattern";
import { type Locale, i18n } from "@/i18n-config";
import "@/app/globals.css";
import { headers } from "next/headers";
import { TailwindIndicator } from "@/components/tailwind-indicator";

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

  return (
    <ClerkProvider>
      <html lang={detectedLocale}>
        <body>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans relative">
            <DotPattern className="absolute inset-0 z-0 opacity-50" />
            <main className="flex-grow container mx-auto my-6 content-center max-w-4xl relative z-10">
              {children}
            </main>
          </div>
          <TailwindIndicator />
        </body>
      </html>
    </ClerkProvider>
  );
}
