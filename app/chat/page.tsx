"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
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
      setLeadData((prev) => ({
        ...prev,
        name: userMessage.replace(/my name is/i, "").trim(),
      }));
    }

    if (userMessage.includes("@")) {
      setLeadData((prev) => ({
        ...prev,
        email: userMessage,
      }));
    }

    if (
      userMessage.toLowerCase().includes("website") ||
      userMessage.toLowerCase().includes("ecommerce") ||
      userMessage.toLowerCase().includes("app")
    ) {
      setLeadData((prev) => ({
        ...prev,
        projectType: userMessage,
      }));
    }

    if (userMessage.match(/\d+/)) {
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

    if (
      userMessage.toLowerCase().includes("payment") ||
      userMessage.toLowerCase().includes("admin") ||
      userMessage.toLowerCase().includes("login")
    ) {
      setLeadData((prev) => ({
        ...prev,
        features: userMessage,
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
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong.",
        },
      ]);
    }
  };

  const completedFields = Object.values(leadData).filter(
    (value) => value !== ""
  ).length;

  const completionPercentage = (completedFields / 6) * 100;

  let leadScore = 0;

  if (leadData.projectType) leadScore += 20;
  if (leadData.budget) leadScore += 20;
  if (leadData.timeline) leadScore += 15;
  if (leadData.features) leadScore += 25;
  if (leadData.email) leadScore += 10;
  if (leadData.name) leadScore += 10;

  let leadQuality = "Low Quality Lead";

  if (leadScore >= 80) {
    leadQuality = "High Quality Lead";
  } else if (leadScore >= 50) {
    leadQuality = "Medium Quality Lead";
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-2">
        AI Lead Qualification Assistant
      </h1>

      <p className="text-green-600 font-semibold">
        Lead Completion: {completionPercentage.toFixed(0)}%
      </p>

      <p className="text-blue-600 font-bold text-xl">
        Lead Score: {leadScore}/100
      </p>

      <p className="mb-6 font-semibold">
        {leadQuality}
      </p>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 h-[450px] overflow-y-auto">
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
          className="flex-1 border border-gray-300 rounded-xl p-4"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl"
        >
          Send
        </button>
      </div>

      <div className="w-full max-w-4xl mt-6 bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-4">Lead Summary</h2>

        <p><strong>Name:</strong> {leadData.name}</p>
        <p><strong>Email:</strong> {leadData.email}</p>
        <p><strong>Project:</strong> {leadData.projectType}</p>
        <p><strong>Budget:</strong> {leadData.budget}</p>
        <p><strong>Timeline:</strong> {leadData.timeline}</p>
        <p><strong>Features:</strong> {leadData.features}</p>
      </div>

      <a
  href="/proposal"
  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
>
  View Proposal
</a>
    </main>
  );
}