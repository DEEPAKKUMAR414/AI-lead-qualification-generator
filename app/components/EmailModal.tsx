type Props = {
  email: string;
  onClose: () => void;
};

export default function EmailModal({
  email,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6 dark:border-zinc-800">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🤖 AI Generated Email
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
              Review, copy or send your AI-generated email.
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            AI Assistant
          </span>
        </div>

        {/* Body */}
        <div className="p-8">
          <textarea
            value={email}
            readOnly
            className="h-80 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-5 text-gray-800 outline-none transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-wrap justify-end gap-3 border-t border-gray-200 px-8 py-6 dark:border-zinc-800">

          <button
            onClick={() => navigator.clipboard.writeText(email)}
            className="rounded-xl border border-gray-200 bg-white px-5 py-3 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            📋 Copy
          </button>

          <button
            onClick={() => {
              window.location.href = `mailto:?subject=Project Proposal&body=${encodeURIComponent(
                email
              )}`;
            }}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            📧 Send Email
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-600"
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
}