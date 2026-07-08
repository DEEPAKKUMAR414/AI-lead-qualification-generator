import {
  FiUser,
  FiMail,
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiLayers,
} from "react-icons/fi";

type LeadData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  features: string;
};

type Props = {
  leadData: LeadData;
};

const fields = [
  {
    key: "name",
    label: "Client Name",
    icon: <FiUser size={18} />,
  },
  {
    key: "email",
    label: "Email Address",
    icon: <FiMail size={18} />,
  },
  {
    key: "projectType",
    label: "Project Type",
    icon: <FiBriefcase size={18} />,
  },
  {
    key: "budget",
    label: "Budget",
    icon: <FiDollarSign size={18} />,
  },
  {
    key: "timeline",
    label: "Timeline",
    icon: <FiClock size={18} />,
  },
  {
    key: "features",
    label: "Features",
    icon: <FiLayers size={18} />,
  },
];

export default function LeadSummary({ leadData }: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">

      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Lead Summary
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
          Information collected by the AI assistant
        </p>
      </div>

      {/* Cards */}

      <div className="space-y-4">

        {fields.map((field) => {
          const value =
            leadData[field.key as keyof LeadData];

          return (
            <div
              key={field.key}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-all duration-300 hover:border-blue-300 hover:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-500 dark:hover:bg-zinc-900"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                {field.icon}
              </div>

              <div className="flex-1">

                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-zinc-500">
                  {field.label}
                </p>

                <p className="mt-1 font-medium text-gray-900 dark:text-white break-words">
                  {value || (
                    <span className="italic text-gray-400 dark:text-zinc-500">
                      Waiting for response...
                    </span>
                  )}
                </p>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}