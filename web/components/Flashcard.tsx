"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { type Dictionary } from "@/get-dictionary";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TimerFuse } from "@/components/ui/timer-fuse";

interface FlashcardProps {
  front: string;
  choices: string[]; // we need to pass in this choices to avoid hydration error as it is randomized
  correctAnswer: number;
  timeLimit: number;
  dict: Dictionary;
}

export function Flashcard({
  params: { front, choices, correctAnswer, timeLimit, dict },
}: {
  params: FlashcardProps;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const handleAnswer = useCallback(
    (index: number) => {
      if (selectedAnswer === null && timeLeft > 0) {
        setSelectedAnswer(index);
        setIsCorrect(index === correctAnswer);
        setIsTimerActive(false);
      }
    },
    [selectedAnswer, timeLeft, correctAnswer],
  );

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (timeLeft > 0 && selectedAnswer === null) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && selectedAnswer === null) {
      setIsCorrect(false);
      setIsTimerActive(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, selectedAnswer]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "1" || event.key === "ArrowUp") {
        handleAnswer(0);
      } else if (event.key === "2" || event.key === "ArrowDown") {
        handleAnswer(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleAnswer]);

  const getButtonClass = (index: number) => {
    if (selectedAnswer === index) {
      return isCorrect
        ? "bg-green-600 hover:bg-green-600 text-white"
        : "bg-red-500 hover:bg-red-500 text-white";
    }
    return "";
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardContent className="flex flex-col justify-between h-full p-6 sm:p-8 md:p-10">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              {front}
            </h2>
          </div>
          <Separator className="my-6 sm:my-8" />
          <div className="flex-grow flex flex-col justify-center">
            <div className="flex flex-col gap-8 sm:gap-6 mb-6">
              {choices.map((choice, index) => (
                <Button
                  key={index}
                  onClick={() =>
                    selectedAnswer === null &&
                    timeLeft > 0 &&
                    handleAnswer(index)
                  }
                  variant="outline"
                  className={`text-sm sm:text-base py-8 sm:py-6 px-5 sm:px-7 h-auto whitespace-normal text-left w-full ${getButtonClass(index)}`}
                >
                  <div className="grid grid-cols-[auto,1fr] gap-3 sm:gap-5 items-center w-full">
                    <span className="text-left text-xl sm:text-lg">
                      {index + 1}.
                    </span>
                    <span className="text-center">{choice}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          <Separator className="my-6 sm:my-8" />
          <div className="text-center flex flex-col justify-center">
            <TimerFuse
              timeLeft={timeLeft}
              timeLimit={timeLimit}
              isActive={isTimerActive}
            />
            <div className="text-base sm:text-lg font-semibold mb-2">
              {dict.flashcard.timeLeft}: {timeLeft}s
            </div>
            <div
              className={`text-base sm:text-lg font-bold ${isCorrect === null ? "invisible" : isCorrect ? "text-green-600" : "text-red-600"}`}
            >
              {isCorrect === null
                ? "Placeholder"
                : isCorrect
                  ? `${dict.flashcard.correct}!`
                  : `${dict.flashcard.incorrect}!`}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
