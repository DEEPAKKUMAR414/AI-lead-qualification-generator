type MessageProps = {
  role: "user" | "ai";
  text: string;
};

export default function ChatMessage({
  role,
  text,
}: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] rounded-3xl px-5 py-4 shadow-sm transition-all duration-300 ${
          isUser
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md"
            : "bg-white border border-gray-200 text-gray-900 rounded-bl-md dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
        }`}
      >
        {!isUser && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            AI Assistant
          </p>
        )}

        <p className="whitespace-pre-line leading-7">
          {text}
        </p>
      </div>
    </div>
  );
}