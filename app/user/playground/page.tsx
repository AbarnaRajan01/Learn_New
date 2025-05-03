"use client";
import { useState } from "react";
import BugFixes from "@/app/Components/BugFixes";
import CodeQuizGame from "@/app/Components/CodeQuiz";
import { FaArrowRight } from "react-icons/fa"; // Cartoon Arrow Icon
import { X } from "lucide-react"; // Close Icon for Modal

const page = () => {
  const [quizCompleted, setQuizCompleted] = useState(false); // Track completion of CodeQuizGame
  const [bugFixCompleted, setBugFixCompleted] = useState(false); // Track completion of BugFixes
  const [showCodeQuiz, setShowCodeQuiz] = useState(false); // To show/hide Code Quiz Game
  const [showBugFixGame, setShowBugFixGame] = useState(false); // To show/hide Bug Fix Game
  const [activeGame, setActiveGame] = useState<"quiz" | "bugFix" | null>(null); // To manage the active game modal

  return (
    <div className="flex flex-col items-center py-12 bg-gray-800">
      {/* Banner with instructions */}
      <div className="w-full text-center mb-8">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Coding Playground
        </h2>
        <p className="text-xl text-gray-300">
          Complete the coding games below to sharpen your skills. Start with the
          quiz, and move to the bug fix challenge!
        </p>
      </div>

      {/* Game Grid */}
      <div className="flex flex-row justify-center space-x-8">
        {/* Code Quiz Box */}
        <div className="bg-gradient-to-r from-blue-400 to-green-500 p-6 rounded-xl shadow-lg w-96 h-96 flex flex-col justify-between transform transition duration-300 hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Code Quiz Game
          </h2>
          {!showCodeQuiz ? (
            <div className="text-center">
              <button
                onClick={() => setShowCodeQuiz(true)}
                className="p-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition duration-300"
              >
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <CodeQuizGame
                onComplete={() => setQuizCompleted(true)} // Mark Code Quiz as completed
              />
              {quizCompleted && (
                <div className="mt-4 text-center text-green-400">
                  <p>Well done! You've completed the quiz!</p>
                  <div className="mt-2">
                    <FaArrowRight className="mx-auto text-xl text-green-400 animate-bounce" />
                    <p className="text-gray-300">
                      Now, move on to the Bug Fix Game!
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bug Fix Box */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl shadow-lg w-96 h-96 flex flex-col justify-between transform transition duration-300 hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Bug Fix Game
          </h2>
          {!showBugFixGame ? (
            <div className="text-center">
              <button
                onClick={() => setShowBugFixGame(true)}
                className="p-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition duration-300"
              >
                Start Bug Fix
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <BugFixes
                onComplete={() => setBugFixCompleted(true)} // Mark Bug Fix as completed
              />
              {bugFixCompleted && (
                <div className="mt-4 text-center text-green-400">
                  <p>Congratulations! You've fixed all the bugs!</p>
                  <div className="mt-2">
                    <FaArrowRight className="mx-auto text-xl text-green-400 animate-bounce" />
                    <p className="text-gray-300">
                      You've completed both challenges!
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Pop-up Modal */}
      {(quizCompleted || bugFixCompleted) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 animate-slide-fade-in"
          onClick={() => {
            setQuizCompleted(false);
            setBugFixCompleted(false);
            setShowCodeQuiz(false);
            setShowBugFixGame(false);
          }}
        >
          <div
            className="relative bg-gray-800 p-6 rounded-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto transform scale-95 hover:scale-100 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setQuizCompleted(false);
                setBugFixCompleted(false);
                setShowCodeQuiz(false);
                setShowBugFixGame(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              <X size={28} />
            </button>

            {quizCompleted && (
              <>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Quiz Completed!
                </h2>
                <p className="text-gray-300 mb-4">
                  Great job on completing the quiz. Now, let's dive into the Bug
                  Fix Game!
                </p>
              </>
            )}

            {bugFixCompleted && (
              <>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Bug Fix Completed!
                </h2>
                <p className="text-gray-300 mb-4">
                  Well done on fixing all the bugs! You've completed both games!
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
