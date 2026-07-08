"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

type Message = {
  role: "user" | "ai";
  text: string;
};

type Props = {
  messages: Message[];
};

export default function ChatWindow({
  messages,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Lead Qualification Assistant
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
          Tell us about your project and we'll qualify your lead.
        </p>
      </div>

      <div className="h-[520px] overflow-y-auto pr-2">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role}
            text={msg.text}
          />
        ))}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}