"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

type LeadData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  features: string;
};

export default function Home() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "👋 Hello! Welcome to AI Lead Qualification Assistant.\n\nWhat is your name?",
    },
  ]);

  const [step, setStep] = useState(0);

  const [leadData, setLeadData] = useState<LeadData>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    features: "",
  });

  const questions = [
    "What is your email address?",
    "What type of project do you need?",
    "What is your budget?",
    "What is your expected timeline?",
    "What features do you need?",
  ];
    const calculateScore = () => {
    let score = 0;

    if (leadData.name) score += 10;
    if (leadData.email) score += 10;
    if (leadData.projectType) score += 20;
    if (leadData.budget) score += 20;
    if (leadData.timeline) score += 15;
    if (leadData.features) score += 25;

    return score;
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userInput = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userInput,
      },
    ]);

    setMessage("");

    const updatedLead = { ...leadData };

    switch (step) {
      case 0:
        updatedLead.name = userInput;
        break;
      case 1:
        updatedLead.email = userInput;
        break;
      case 2:
        updatedLead.projectType = userInput;
        break;
      case 3:
        updatedLead.budget = userInput;
        break;
      case 4:
        updatedLead.timeline = userInput;
        break;
      case 5:
        updatedLead.features = userInput;
        break;
    }

    setLeadData(updatedLead);

    if (step < questions.length) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: questions[step],
          },
        ]);
      }, 400);

      setStep(step + 1);
      return;
    }

    const score = calculateScore();

    await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...updatedLead,
        score,
        status: "New",
      }),
    });

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "✅ Thank you! Your lead has been saved successfully.\n\nYou can now open the Dashboard to view it.",
        },
      ]);
    }, 500);
  };

  const completed =
    Object.values(leadData).filter(Boolean).length;

  const completionPercentage = (completed / 6) * 100;

  const leadScore = calculateScore();

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

      <p className="text-lg font-semibold text-green-600 mb-2">
        Lead Completion: {completionPercentage.toFixed(0)}%
      </p>

      <p className="text-xl font-bold text-blue-600">
        Lead Score: {leadScore}/100
      </p>

      <p className="font-semibold mb-6">
        {leadQuality}
      </p>

      {/* Chat Box */}

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg h-[500px] overflow-y-auto p-6">

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
              className={`px-4 py-3 rounded-2xl max-w-[75%] ${
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

      {/* Input */}

      <div className="w-full max-w-4xl flex gap-3 mt-5">

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your answer..."
          className="flex-1 border rounded-xl p-4"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl"
        >
          Send
        </button>

      </div>

      {/* Lead Summary */}

      <div className="w-full max-w-4xl bg-white rounded-xl shadow mt-8 p-6">

        <h2 className="text-2xl font-bold mb-4">
          Lead Summary
        </h2>

        <div className="space-y-2">

          <p><strong>Name:</strong> {leadData.name}</p>

          <p><strong>Email:</strong> {leadData.email}</p>

          <p><strong>Project:</strong> {leadData.projectType}</p>

          <p><strong>Budget:</strong> {leadData.budget}</p>

          <p><strong>Timeline:</strong> {leadData.timeline}</p>

          <p><strong>Features:</strong> {leadData.features}</p>

        </div>

      </div>

    </main>
  );
}