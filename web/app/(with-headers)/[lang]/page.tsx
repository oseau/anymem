import { type Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { LayersIcon, MobileIcon, UpdateIcon } from "@radix-ui/react-icons";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Page({
  params: { lang, localeSource },
}: {
  params: { lang: Locale; localeSource?: string };
}) {
  const dictionary = await getDictionary(lang);
  const i18nPrefix = localeSource === "detection" ? "" : `/${lang}`;
  return (
    <>
      <section className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 my-10">
          {dictionary.hero.title}
        </h2>
        <div className="flex justify-center space-x-4">
          <a
            href="/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300"
          >
            {dictionary.hero.startLearning}
          </a>
        </div>
      </section>

      <section id="features" className="mb-8">
        <BentoGrid className="auto-rows-[10rem]">
          <BentoCard
            name={dictionary.features.spacedRepetition.title}
            description={dictionary.features.spacedRepetition.description}
            Icon={UpdateIcon}
            className="md:col-span-2"
            href={`${i18nPrefix}/spaced-repetition`}
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
            href={`${i18nPrefix}/multi-platform`}
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
            href={`${i18nPrefix}/customizable-decks`}
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
