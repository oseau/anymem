import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '../i18n'

export default async function Home({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await useTranslation(lng)
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      <header className="bg-white shadow-md py-4">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">{t('appName')}</h1>
          </Link>
          <div className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-blue-600">
              {t('features')}
            </a>
            <a href="#download" className="text-gray-600 hover:text-blue-600">
              {t('comingSoon')}
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col justify-between">
        <section className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Learn and Memorize Anything
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            AnyMem helps you remember everything you learn with powerful spaced repetition algorithms.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300">
              Start Learning
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 border border-blue-600">
              Watch Demo
            </button>
          </div>
        </section>

        <section id="features" className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Spaced Repetition</h3>
            <p className="text-gray-600">
              Optimize your learning with scientifically proven spaced repetition techniques.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Multi-Platform</h3>
            <p className="text-gray-600">
              Access your learning materials on any device, anytime, anywhere.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Customizable Decks</h3>
            <p className="text-gray-600">
              Create and organize your own study decks for any subject or topic.
            </p>
          </div>
        </section>

        <section id="download" className="text-center mt-auto">
          <h2 className="text-2xl font-bold mb-3">Download AnyMem</h2>
          <p className="text-lg text-gray-600">
            Coming soon to iOS and Android. Stay tuned!
          </p>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-3 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 AnyMem. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
