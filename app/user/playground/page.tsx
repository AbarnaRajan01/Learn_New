"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import BugFixes from "@/app/Components/BugFixes";
import CodeQuizGame from "@/app/Components/CodeQuiz";
import { X } from "lucide-react";

export default function PlaygroundPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const username = session?.user?.name || "Guest";

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [bugFixCompleted, setBugFixCompleted] = useState(false);
  const [showCodeQuiz, setShowCodeQuiz] = useState(false);
  const [showBugFixGame, setShowBugFixGame] = useState(false);

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    setShowCodeQuiz(false);
  };

  const handleBugFixComplete = () => {
    setBugFixCompleted(true);
    setShowBugFixGame(false);
    setTimeout(() => router.push("/dashboard"), 2000);
  };

  const closeModal = () => {
    setShowCodeQuiz(false);
    setShowBugFixGame(false);
  };

  return (
    <div className="flex flex-col items-center py-12 bg-gray-800">
      <div className="w-full text-center mb-8">
        <h2 className="text-4xl font-extrabold text-white mb-2">
          Coding Playground
        </h2>
        <p className="text-xl text-gray-300">
          Welcome, {username}! Complete the coding games below to sharpen your
          skills.
        </p>
      </div>

      <div className="flex flex-row justify-center space-x-8">
        {/* Code Quiz Box */}
        <div className="bg-gradient-to-r from-blue-400 to-green-500 p-6 rounded-xl shadow-lg w-96 h-96 flex flex-col justify-between transform transition duration-300 hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Code Quiz Game
          </h2>
          {!showCodeQuiz ? (
            <button
              onClick={() => setShowCodeQuiz(true)}
              className="p-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition duration-300"
            >
              Start Quiz
            </button>
          ) : (
            <CodeQuizGame onComplete={handleQuizComplete} />
          )}
        </div>

        {/* Bug Fix Box */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl shadow-lg w-96 h-96 flex flex-col justify-between transform transition duration-300 hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Bug Fix Game
          </h2>
          {!showBugFixGame ? (
            <button
              onClick={() => setShowBugFixGame(true)}
              className="p-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition duration-300"
              disabled={!quizCompleted}
            >
              {quizCompleted ? "Start Bug Fix" : "Unlock after Quiz"}
            </button>
          ) : (
            <BugFixes onComplete={handleBugFixComplete} />
          )}
        </div>
      </div>
    </div>
  );
}
