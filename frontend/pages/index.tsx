import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      <Head>
        <title>MemoryMaster - Remember Anything You've Learned</title>
        <meta
          name="description"
          content="MemoryMaster: The ultimate flashcard app for remembering anything you've learned. Available on web, iOS, and Android."
        />
      </Head>
      <header className="bg-white shadow-md py-4">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">MemoryMaster</h1>
          <div className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#download" className="text-gray-600 hover:text-blue-600">Download</a>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-12 overflow-y-auto">
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Remember Anything You've Learned
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            MemoryMaster is the ultimate flashcard app that helps you retain knowledge effortlessly. Available on web, iOS, and Android.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300">
              Start Learning Now
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 border border-blue-600">
              Watch Demo
            </button>
          </div>
        </section>
        
        <section id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Spaced Repetition</h3>
            <p className="text-gray-600">Optimize your learning with our advanced spaced repetition algorithm.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Multi-Platform</h3>
            <p className="text-gray-600">Access your flashcards anytime, anywhere on web, iOS, and Android.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Customizable Decks</h3>
            <p className="text-gray-600">Create and organize flashcards your way with custom decks and tags.</p>
          </div>
        </section>
        
        <section id="download" className="text-center">
          <h2 className="text-3xl font-bold mb-6">MemoryMaster Mobile App</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our mobile app is coming soon! Stay tuned for the release on iOS and Android.
          </p>
          <div className="flex justify-center space-x-4">
            <button disabled className="bg-gray-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 flex items-center cursor-not-allowed">
              <Image src="/app-store-badge.svg" alt="App Store" width={24} height={24} className="mr-2" />
              Coming Soon
            </button>
            <button disabled className="bg-gray-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 flex items-center cursor-not-allowed">
              <Image src="/google-play-badge.svg" alt="Google Play" width={24} height={24} className="mr-2" />
              Coming Soon
            </button>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 MemoryMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
