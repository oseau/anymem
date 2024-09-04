import { getDictionary } from "@/get-dictionary";
import Link from "next/link";
import DotPattern from "@/components/magicui/dot-pattern";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { UpdateIcon, MobileIcon, LayersIcon } from "@radix-ui/react-icons";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans relative">
      <DotPattern className="absolute inset-0 z-0 opacity-50" />
      <header className="bg-white shadow-md py-4 relative z-10">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <Link href={`/${lang}`}>
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
              {dictionary.title}
            </h1>
          </Link>
          <div className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-blue-600">
              {dictionary.header.features}
            </a>
            <a href="#download" className="text-gray-600 hover:text-blue-600">
              {dictionary.header.comingSoon}
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col justify-between relative z-10">
        <section className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {dictionary.hero.title}
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {dictionary.hero.description}
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300">
              {dictionary.hero.startLearning}
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 border border-blue-600">
              {dictionary.hero.watchDemo}
            </button>
          </div>
        </section>

        <section id="features" className="mb-8">
          <BentoGrid className="auto-rows-[20rem]">
            <BentoCard
              name={dictionary.features.spacedRepetition.title}
              description={dictionary.features.spacedRepetition.description}
              Icon={UpdateIcon}
              className="md:col-span-2"
              background={<DotPattern width={20} height={20} cx={1} cy={1} cr={1} />}
              href="#"
              cta={dictionary.features.learnMore}
            />
            <BentoCard
              name={dictionary.features.multiPlatform.title}
              description={dictionary.features.multiPlatform.description}
              Icon={MobileIcon}
              className="md:col-span-1"
              background={<DotPattern width={20} height={20} cx={1} cy={1} cr={1} />}
              href="#"
              cta={dictionary.features.learnMore}
            />
            <BentoCard
              name={dictionary.features.customizableDecks.title}
              description={dictionary.features.customizableDecks.description}
              Icon={LayersIcon}
              className="md:col-span-3"
              background={<DotPattern width={20} height={20} cx={1} cy={1} cr={1} />}
              href="#"
              cta={dictionary.features.learnMore}
            />
          </BentoGrid>
        </section>

        <section id="download" className="text-center mt-auto">
          <h2 className="text-2xl font-bold mb-3">
            {dictionary.download.title}
          </h2>
          <p className="text-lg text-gray-600">
            {dictionary.download.description}
          </p>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-3 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>{dictionary.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
