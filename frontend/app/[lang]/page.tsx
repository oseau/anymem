import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '../../i18n'

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  const { t } = await useTranslation(lang)
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      <header className="bg-white shadow-md py-4">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <Link href={`/${lang}`}>
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">{t('title')}</h1>
          </Link>
          <div className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-blue-600">
              {t('header.features')}
            </a>
            <a href="#download" className="text-gray-600 hover:text-blue-600">
              {t('header.comingSoon')}
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col justify-between">
        <section className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('hero.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300">
              {t('hero.startLearning')}
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 border border-blue-600">
              {t('hero.watchDemo')}
            </button>
          </div>
        </section>

        <section id="features" className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{t('features.spacedRepetition.title')}</h3>
            <p className="text-gray-600">
              {t('features.spacedRepetition.description')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{t('features.multiPlatform.title')}</h3>
            <p className="text-gray-600">
              {t('features.multiPlatform.description')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{t('features.customizableDecks.title')}</h3>
            <p className="text-gray-600">
              {t('features.customizableDecks.description')}
            </p>
          </div>
        </section>

        <section id="download" className="text-center mt-auto">
          <h2 className="text-2xl font-bold mb-3">{t('download.title')}</h2>
          <p className="text-lg text-gray-600">
            {t('download.description')}
          </p>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-3 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  )
}
