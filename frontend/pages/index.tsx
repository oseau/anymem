import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Flashcard from "../components/Flashcard";

const Home: NextPage = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards] = useState([
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
  ]);

  const handleAnswer = (quality: number) => {
    console.log(`Answer quality: ${quality}`);
    // Here you would implement spaced repetition algorithm
    // For now, we'll just move to the next card
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 font-sans">
      <Head>
        <title>Flashcard App</title>
        <meta
          name="description"
          content="Spaced repetition flashcard application"
        />
      </Head>
      <main className="text-center">
        <h1 className="text-gray-800 text-4xl mb-8">
          Flashcard App
        </h1>
        <Flashcard
          question={cards[currentCardIndex].question}
          answer={cards[currentCardIndex].answer}
          onAnswer={handleAnswer}
        />
      </main>
    </div>
  );
};

export default Home;
