"use client";
import { useState } from "react";

type Message = {
  sender: "user" | "assistant";
  text: string;
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: data.message || "No response." },
      ]);
    } catch (err) {
      console.error("Failed to fetch chat response:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: "Error: Failed to get response." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded shadow bg-white">
      <div className="h-64 overflow-y-auto space-y-2 mb-2 bg-gray-50 p-2 rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.sender === "user"
                ? "bg-blue-200 text-right"
                : "bg-green-200 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-500">Typing...</div>}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded p-2 mr-2"
          placeholder="Ask me for a tech roadmap..."
          disabled={loading}
          aria-label="Chat input"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
