"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([
  "AI: Hello! What type of project do you need?",
]);

  const sendMessage = async () => {
  if (!message.trim()) return;

  const userMessage = message;

  setMessages((prev) => [...prev, `You: ${userMessage}`]);
  setMessage("");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: userMessage,
    }),
  });

  const data = await res.json();

  setMessages((prev) => [
    ...prev,
    `AI: ${data.reply}`,
  ]);
};

  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">
        AI Lead Qualification Assistant
      </h1>

      <div className="w-full max-w-2xl border rounded-lg p-4 h-[400px] overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>You:</strong> {msg}
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl flex gap-2 mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your project..."
          className="flex-1 border rounded-lg p-3"
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Send
        </button>
      </div>
    </main>
  );
}