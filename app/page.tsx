"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello! What type of project do you need?",
    },
  ]);

  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    features: "",
  });

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    if (userMessage.toLowerCase().includes("my name is")) {
  const name = userMessage.replace(/my name is/i, "").trim();

  setLeadData((prev) => ({
    ...prev,
    name,
  }));
}

if (userMessage.toLowerCase().includes("@")) {
  setLeadData((prev) => ({
    ...prev,
    email: userMessage.trim(),
  }));
}

if (userMessage.toLowerCase().includes("budget")) {
  setLeadData((prev) => ({
    ...prev,
    budget: userMessage,
  }));
}

if (
  userMessage.toLowerCase().includes("month") ||
  userMessage.toLowerCase().includes("week")
) {
  setLeadData((prev) => ({
    ...prev,
    timeline: userMessage,
  }));
}


    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    try {
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
        {
          role: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">
        AI Lead Qualification Assistant
      </h1>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 h-[500px] overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-4xl flex gap-2 mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your project..."
          className="flex-1 border border-gray-300 rounded-xl p-4 outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl"
        >
          Send
        </button>
      </div>

      <div className="w-full max-w-4xl mt-6 bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-2">Lead Data</h2>

        <pre>
          {JSON.stringify(leadData, null, 2)}
        </pre>
      </div>
    </main>
  );
}