import { ClerkProvider, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/get-dictionary";
import DotPattern from "@/components/magicui/dot-pattern";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { i18n, type Locale } from "@/i18n-config";
import "@/app/globals.css";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "AnyMem",
  description: "Memorize anything with AnyMem",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang?: Locale };
}) {
  const headersList = headers();
  const detectedLocale =
    (headersList.get("x-detected-locale") as Locale) || i18n.defaultLocale;
  const localeSource = headersList.get("x-locale-source") || "detection";
  const lang = params.lang || detectedLocale;
  const i18nPrefix = localeSource === "url" ? `/${lang}` : "";

  console.log(`Layout Language: ${lang}, Source: ${localeSource}`);

  const dictionary = await getDictionary(lang);

  return (
    <ClerkProvider>
      <html lang={lang}>
        <body>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans relative">
            <DotPattern className="absolute inset-0 z-0 opacity-50" />
            <header className="bg-white shadow-md py-4 relative z-10">
              <nav className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
                <Link href={`${i18nPrefix}/`}>
                  <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
                    <span>{dictionary.title.split(" - ")[0]}</span>
                    <span className="hidden sm:inline">
                      {" "}
                      - {dictionary.title.split(" - ")[1]}
                    </span>
                  </h1>
                </Link>
                <div className="flex items-center space-x-4">
                  <a
                    href="#features"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {dictionary.header.features}
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
                  <UserButton afterSignOutUrl={`/${params.lang}`} />
                </div>
              </nav>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl relative z-10">
              {children}
            </main>

            <footer className="bg-gray-800 text-white py-3">
              <div className="container mx-auto px-4 max-w-6xl text-center">
                <p>{dictionary.footer.copyright}</p>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}