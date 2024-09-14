import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { UpdateIcon, MobileIcon, LayersIcon } from "@radix-ui/react-icons";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { userId } = auth();
  const dictionary = await getDictionary(lang);

  return (
    <>
      <section className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {dictionary.hero.title}
        </h2>
        <p className="text-lg text-gray-600 mb-6 mx-auto">
          {dictionary.hero.description1}
          <br />
          {dictionary.hero.description2}
        </p>
        <div className="flex justify-center space-x-4">
          {userId ? (
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300">
              {dictionary.hero.startLearning}
            </button>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300">
                  {dictionary.auth.signIn}
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 border border-blue-600">
                  {dictionary.auth.signUp}
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </section>

      <section id="features" className="mb-8">
        <BentoGrid className="auto-rows-[10rem]">
          <BentoCard
            name={dictionary.features.spacedRepetition.title}
            description={dictionary.features.spacedRepetition.description}
            Icon={UpdateIcon}
            className="md:col-span-2"
            href={`/${lang}/spaced-repetition`}
            cta={dictionary.features.learnMore}
            background={
              <div className="bg-gradient-to-br from-blue-100 to-blue-200" />
            }
          />
          <BentoCard
            name={dictionary.features.multiPlatform.title}
            description={dictionary.features.multiPlatform.description}
            Icon={MobileIcon}
            className="md:col-span-1"
            href={`/${lang}/multi-platform`}
            cta={dictionary.features.learnMore}
            background={
              <div className="bg-gradient-to-br from-blue-100 to-blue-200" />
            }
          />
          <BentoCard
            name={dictionary.features.customizableDecks.title}
            description={dictionary.features.customizableDecks.description}
            Icon={LayersIcon}
            className="md:col-span-3"
            href={`/${lang}/customizable-decks`}
            cta={dictionary.features.learnMore}
            background={
              <div className="bg-gradient-to-br from-blue-100 to-blue-200" />
            }
          />
        </BentoGrid>
      </section>
    </>
  );
}
