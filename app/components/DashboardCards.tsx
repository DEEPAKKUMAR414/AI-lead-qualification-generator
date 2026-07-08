import {
  FiUsers,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";

type DashboardCardsProps = {
  totalLeads: number;
  highQualityLeads: number;
  averageScore: number;
};

export default function DashboardCards({
  totalLeads,
  highQualityLeads,
  averageScore,
}: DashboardCardsProps) {
  const cards = [
    {
      title: "Total Leads",
      value: totalLeads,
      icon: <FiUsers size={28} />,
      color: "from-blue-500 to-cyan-500",
      text: "All captured leads",
    },
    {
      title: "High Quality",
      value: highQualityLeads,
      icon: <FiAward size={28} />,
      color: "from-emerald-500 to-green-600",
      text: "Ready for conversion",
    },
    {
      title: "Average Score",
      value: averageScore,
      icon: <FiTrendingUp size={28} />,
      color: "from-purple-500 to-pink-500",
      text: "Overall lead quality",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20 dark:hover:border-zinc-700 dark:hover:shadow-black/40"
        >
          {/* Gradient strip */}
          <div
            className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${card.color}`}
          />

          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </h2>

              <p className="text-sm text-gray-400 dark:text-zinc-500">
                {card.text}
              </p>
            </div>

            <div
              className={`
                flex h-16 w-16 items-center justify-center
                rounded-2xl
                bg-gradient-to-r
                ${card.color}
                text-white
                shadow-lg
                transition-transform
                duration-300
                group-hover:scale-110
              `}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}