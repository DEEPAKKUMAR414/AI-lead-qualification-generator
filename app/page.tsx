"use client";

import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import ProgressCard from "./components/ProgressCard";
import LeadSummary from "./components/LeadSummary";

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
      text:
        "👋 Hello! Welcome to AI Lead Qualification Assistant.\n\nWhat is your name?",
    },
  ]);

  const [step, setStep] = useState(0);

  const [leadData, setLeadData] =
    useState<LeadData>({
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

    const updatedLead = {
      ...leadData,
    };

    switch (step) {
      case 0:
        updatedLead.name = userInput;
        break;

      case 1:
        updatedLead.email = userInput;
        break;

      case 2:
        updatedLead.projectType =
          userInput;
        break;

      case 3:
        updatedLead.budget = userInput;
        break;

      case 4:
        updatedLead.timeline =
          userInput;
        break;

      case 5:
        updatedLead.features =
          userInput;
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

    try {
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
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "❌ Something went wrong while saving your lead. Please try again.",
        },
      ]);
    }
  };

  const completed =
    Object.values(leadData).filter(Boolean).length;

  const completionPercentage =
    (completed / 6) * 100;

  const leadScore = calculateScore();

  let leadQuality = "Low Quality Lead";

  if (leadScore >= 80) {
    leadQuality = "High Quality Lead";
  } else if (leadScore >= 50) {
    leadQuality = "Medium Quality Lead";
  }

  return (
        <main className="min-h-screen bg-gray-100 transition-colors duration-300 dark:bg-zinc-950">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            AI Lead Qualification Assistant
          </h1>

          <p className="mt-2 text-gray-500 dark:text-zinc-400">
            Qualify potential clients with AI before sending them to your CRM.
          </p>
        </div>

        {/* Progress Card */}

        <div className="mb-8">
          <ProgressCard
            completionPercentage={completionPercentage}
            leadScore={leadScore}
            leadQuality={leadQuality}
          />
        </div>

        {/* Main Grid */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Chat Section */}

          <div className="flex flex-col lg:col-span-2">

            <ChatWindow
              messages={messages}
            />

            <ChatInput
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />

          </div>

          {/* Right Panel */}

          <div className="space-y-6">

            <LeadSummary
              leadData={leadData}
            />

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900">

              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                AI Insights
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
                Based on the collected information.
              </p>

              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-zinc-400">
                    Completion
                  </span>

                  <span className="font-semibold text-gray-900 dark:text-white">
                    {completionPercentage.toFixed(0)}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-800">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-700"
                    style={{
                      width: `${completionPercentage}%`,
                    }}
                  />

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-500 dark:text-zinc-400">
                    Lead Score
                  </span>

                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {leadScore}/100
                  </span>

                </div>
                                <div className="flex items-center justify-between">

                  <span className="text-gray-500 dark:text-zinc-400">
                    Quality
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${
                      leadScore >= 80
                        ? "bg-green-500"
                        : leadScore >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {leadQuality}
                  </span>

                </div>

              </div>

            </div>

            {/* Tips */}

            <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm dark:border-blue-900 dark:from-blue-950/30 dark:to-indigo-950/30">

              <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">
                💡 AI Recommendation
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-zinc-400">
                The more information you provide, the better the AI can
                qualify your lead and generate personalized proposals
                and follow-up emails.
              </p>

              <div className="mt-5 rounded-2xl bg-white/70 p-4 dark:bg-zinc-900/70">
                <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                  ✔ Complete all 6 fields
                </p>

                <p className="mt-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
                  ✔ Higher score means better lead quality
                </p>

                <p className="mt-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
                  ✔ Leads are automatically saved to your CRM
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}