"use client";
import { useState, useEffect } from "react";

const buggedCode = `
function greet() {
  var name = "World";
  console.log("Hello, " + name);
}

greet();
`;

const correctCode = `
function greet() {
  let name = "World";
  console.log("Hello, " + name);
}

greet();
`;

interface BugFixGameProps {
  onComplete: () => void; // Notify when game is completed
}

export default function BugFixGame({ onComplete }: BugFixGameProps) {
  const [userCode, setUserCode] = useState(buggedCode);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const checkSolution = () => {
    if (userCode.trim() === correctCode.trim()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  // Notify when the solution is correct and game is completed
  useEffect(() => {
    if (isCorrect === true) {
      onComplete(); // Notify that the game is completed when correct
    }
  }, [isCorrect, onComplete]);

  return (
    <div className="p-6 bg-gray-900 rounded-xl text-white max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Bug Fix Game</h2>
      <p className="mb-4">Fix the bugs in the code below and submit it.</p>

      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        rows={10}
        className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none mb-4"
      />

      <button
        onClick={checkSolution}
        className="w-full p-3 bg-gradient-to-r from-blue-400 to-green-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Check Code
      </button>

      {isCorrect !== null && (
        <div
          className={`mt-4 text-center ${isCorrect ? "text-green-500" : "text-red-500"}`}
        >
          {isCorrect ? "Correct! Well Done!" : "Oops! Try Again."}
        </div>
      )}
    </div>
  );
}
