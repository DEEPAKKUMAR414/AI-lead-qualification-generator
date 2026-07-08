type ChatInputProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>
  sendMessage: () => void;
};

export default function ChatInput({
  message,
  setMessage,
  sendMessage,
}: ChatInputProps) {
  return (
    <div className="sticky bottom-0 mt-6 rounded-3xl border border-gray-200 bg-white/90 p-4 shadow-lg backdrop-blur-xl transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="flex items-center gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Describe your project..."
          className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:bg-zinc-900"
        />

        <button
          onClick={sendMessage}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
        >
          Send →
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-gray-400 dark:text-zinc-500">
        Press <span className="font-semibold">Enter</span> to send your message
      </p>
    </div>
  );
}