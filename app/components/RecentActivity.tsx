import {
  FiUserPlus,
  FiMail,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";

const activities = [
  {
    icon: <FiUserPlus className="text-blue-600 dark:text-blue-400" />,
    title: "New Lead Added",
    desc: "Rahul Sharma submitted a website enquiry.",
    time: "2 min ago",
  },
  {
    icon: <FiMail className="text-purple-600 dark:text-purple-400" />,
    title: "AI Email Generated",
    desc: "Follow-up email created successfully.",
    time: "8 min ago",
  },
  {
    icon: <FiFileText className="text-orange-500 dark:text-orange-400" />,
    title: "Proposal Generated",
    desc: "Proposal PDF downloaded.",
    time: "20 min ago",
  },
  {
    icon: <FiCheckCircle className="text-green-600 dark:text-green-400" />,
    title: "Lead Qualified",
    desc: "Status updated to Qualified.",
    time: "1 hour ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
            Latest updates from your CRM
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          ● Live
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-5 top-2 bottom-2 w-px bg-gray-200 dark:bg-zinc-700" />

        <div className="space-y-5">
          {activities.map((item, index) => (
            <div
              key={index}
              className="group relative flex items-start gap-4 rounded-2xl p-3 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-zinc-800/60"
            >
              {/* Icon */}
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </p>

                <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>

              {/* Time */}
              <span className="whitespace-nowrap rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-zinc-800 dark:text-zinc-400">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}