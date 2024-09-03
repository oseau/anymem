import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen font-sans">
      <Head>
        <title>Frontend App</title>
        <meta
          name="description"
          content="Welcome to our frontend application"
        />
      </Head>
      <main>
        <h1 className="text-gray-800 text-4xl">
          Welcome to the Frontend
        </h1>
      </main>
    </div>
  );
};

export default Home;
