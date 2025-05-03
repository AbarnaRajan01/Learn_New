"use client";
import { useState, useEffect } from "react";

// Define the Question type
type Question = {
  question: string;
  options: string[];
  correct: number;
};

interface CodeQuizGameProps {
  onComplete: () => void; // Adding onComplete prop to notify when game is complete
}

// Array of questions
const codeQuiz: Question[] = [
  {
    question: "What does 'const' do in JavaScript?",
    options: [
      "Declares a variable",
      "Declares a constant",
      "Defines a function",
      "None of the above",
    ],
    correct: 1,
  },
  {
    question: "Which of the following is a valid JavaScript data type?",
    options: ["String", "Integer", "List", "None of the above"],
    correct: 0,
  },
  {
    question: "Which HTML tag is used to define an internal stylesheet?",
    options: ["<style>", "<script>", "<css>", "<link>"],
    correct: 0,
  },
  // Add more questions here
];

export default function CodeQuizGame({ onComplete }: CodeQuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === codeQuiz[currentQuestionIndex].correct) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < codeQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  // Call onComplete when the game is over
  useEffect(() => {
    if (gameOver) {
      onComplete(); // Notify that the game is complete
    }
  }, [gameOver, onComplete]);

  return (
    <div className="p-6 bg-gray-900 rounded-xl text-white max-w-md mx-auto">
      {!gameOver ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Question {currentQuestionIndex + 1}
          </h2>
          <p className="text-lg mb-4">
            {codeQuiz[currentQuestionIndex].question}
          </p>
          <div className="space-y-4">
            {codeQuiz[currentQuestionIndex].options.map(
              (option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Game Over!</h2>
          <p>
            Your score: {score} / {codeQuiz.length}
          </p>
          <button
            onClick={() => {
              setScore(0);
              setCurrentQuestionIndex(0);
              setGameOver(false);
            }}
            className="mt-4 bg-gradient-to-r from-blue-400 to-green-500 text-white py-2 px-6 rounded-xl"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}
