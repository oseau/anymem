import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 font-sans">
      <Head>
        <title>Flashcard App - Coming Soon</title>
        <meta
          name="description"
          content="Spaced repetition flashcard application - Coming Soon"
        />
      </Head>
      <main className="text-center">
        <h1 className="text-gray-800 text-4xl mb-8">
          Flashcard App
        </h1>
        <p className="text-xl mb-8">
          A powerful spaced repetition learning tool.
        </p>
        <p className="text-lg mb-8">
          Coming soon! We're working hard to bring you an amazing flashcard experience.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Get Notified
        </button>
      </main>
    </div>
  );
};

export default Home;
