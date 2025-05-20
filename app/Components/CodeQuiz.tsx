"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";

type CodeQuizGameProps = {
  onComplete: () => void;
};

type Question = {
  question: string;
  options: string[];
  correct: number;
};

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
];

async function saveCertificate(
  username: string,
  topic: string,
  score: number
): Promise<void> {
  await client.create({
    _type: "certificate",
    username,
    topic,
    score,
    date: new Date().toISOString(),
  });
}

export default function CodeQuizGame({ onComplete }: CodeQuizGameProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const username = session?.user?.name || "Guest";

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);

  const handleAnswer = (index: number) => {
    if (index === codeQuiz[currentIndex].correct) {
      setScore((prev) => prev + 1);
    }
    if (currentIndex < codeQuiz.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  useEffect(() => {
    if (finished) {
      saveCertificate(username, "Code Quiz Game", score).then(() => {
        onComplete();
      });
    }
  }, [finished, username, score, onComplete]);

  return (
    <div className="p-6 bg-gray-900 rounded-xl text-white max-w-md mx-auto">
      {!finished ? (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Question {currentIndex + 1}
          </h2>
          <p className="text-lg mb-4">{codeQuiz[currentIndex].question}</p>
          <div className="space-y-4">
            {codeQuiz[currentIndex].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">🎉 Quiz Completed!</h2>
          <p className="mb-2">
            {username}, your score: {score}/{codeQuiz.length}
          </p>
        </div>
      )}
    </div>
  );
}
