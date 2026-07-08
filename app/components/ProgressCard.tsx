type ProgressCardProps = {
  completionPercentage: number;
  leadScore: number;
  leadQuality: string;
};

export default function ProgressCard({
  completionPercentage,
  leadScore,
  leadQuality,
}: ProgressCardProps) {
  const progressColor =
    leadScore >= 80
      ? "bg-green-500"
      : leadScore >= 50
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Lead Qualification
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
            AI is collecting project details
          </p>
        </div>

        <div className="rounded-xl bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          {completionPercentage.toFixed(0)}%
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500 dark:text-zinc-400">
            Completion
          </span>

          <span className="font-semibold text-gray-700 dark:text-zinc-300">
            {completionPercentage.toFixed(0)}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-700"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="mb-5 rounded-2xl bg-gray-50 p-4 dark:bg-zinc-800">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-zinc-400">
            Lead Score
          </span>

          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {leadScore}/100
          </span>
        </div>
      </div>

      {/* Quality */}
      <div className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 dark:border-zinc-700">
        <span className="text-gray-500 dark:text-zinc-400">
          Quality
        </span>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${progressColor}`}
        >
          {leadQuality}
        </span>
      </div>
    </div>
  );
}