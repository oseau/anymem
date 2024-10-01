import type { Metadata } from "next";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { type Locale, i18n } from "@/i18n-config";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { getDictionary } from "@/get-dictionary";
import Link from "next/link";
import DotPattern from "@/components/magicui/dot-pattern";
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
  const dict = await getDictionary(detectedLocale);
  return (
    <ClerkProvider>
      <html lang={detectedLocale}>
        <body>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans relative">
            <header className="bg-white shadow-md py-2 relative z-10">
              <nav className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
                <Link href="/">
                  <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
                    <span>{dict.hero.title}</span>
                  </h1>
                </Link>
                <div className="flex items-center space-x-4">
                  <a
                    href="#features"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    features
                  </a>
                  <a
                    href="https://twitter.com/Yangorz/status/1831610190518698431"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600"
                    aria-label="Twitter Announcement"
                  >
                    <TwitterLogoIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/oseau/anymem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600"
                    aria-label="GitHub Repository"
                  >
                    <GitHubLogoIcon className="w-5 h-5" />
                  </a>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </nav>
            </header>
            <DotPattern className="absolute inset-0 z-0 opacity-50" />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl relative z-10">
              {children}
            </main>
          </div>
          <TailwindIndicator />
        </body>
      </html>
    </ClerkProvider>
  );
}
