"use client";
import { useState } from "react";

export default function QnABox() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Predefined topics
  const topics = [
    "AI",
    "Web Development",
    "Machine Learning",
    "Quantum Computing",
    "Blockchain",
  ];

  const generateAnswer = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.answer || "No response.");
    } catch (error) {
      setResponse("⚠️ Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 rounded-xl bg-gray-900 shadow-xl max-w-2xl mx-auto space-y-5">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Ask the AI Assistant
      </h2>

      <select
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="">Choose a Topic</option>
        {topics.map((topic, index) => (
          <option key={index} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      <button
        onClick={generateAnswer}
        disabled={loading}
        className="w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold hover:opacity-90 transition"
      >
        {loading ? "Generating..." : "Submit"}
      </button>

      {response && (
        <div className="bg-gray-800 p-4 rounded-lg border border-green-500 text-white">
          <p className="text-green-300 text-sm mb-2">AI says:</p>
          <p className="whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
}
