import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/get-dictionary";
import DotPattern from "@/components/magicui/dot-pattern";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { i18n, type Locale } from "../../i18n-config";
import "../globals.css";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans relative">
          <DotPattern className="absolute inset-0 z-0 opacity-50" />
          <header className="bg-white shadow-md py-4 relative z-10">
            <nav className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
              <Link href={`/${params.lang}`}>
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
                  href="#download"
                  className="text-gray-600 hover:text-blue-600"
                >
                  {dictionary.header.comingSoon}
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
  );
}

export const metadata: Metadata = {
  title: "AnyMem",
  description: "Memorize anything with AnyMem",
};
