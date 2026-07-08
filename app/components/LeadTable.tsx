import { FiMail } from "react-icons/fi";
import ProposalButton from "./ProposalButton";

type Lead = {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  features: string;
  score: number | null;
  status: string;
  followUpEmail?: string;
};

type LeadTableProps = {
  leads: Lead[];
  updateStatus: (id: string, status: string) => void;
  generateEmail: (lead: Lead) => void;
};

export default function LeadTable({
  leads,
  updateStatus,
  generateEmail,
}: LeadTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
            {[
              "Name",
              "Email",
              "Project",
              "Budget",
              "Timeline",
              "Score",
              "Status",
              "AI Email",
              "Proposal",
            ].map((heading) => (
              <th
                key={heading}
                className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-zinc-400"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b border-gray-100 transition-all duration-300 hover:bg-blue-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
            >
              {/* Name */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white shadow-md">
                    {lead.name ? lead.name.charAt(0).toUpperCase() : "?"}
                  </div>

                  <span className="font-semibold text-gray-900 dark:text-white">
                    {lead.name}
                  </span>
                </div>
              </td>

              {/* Email */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-gray-600 dark:text-zinc-400">
                  <FiMail />
                  {lead.email}
                </div>
              </td>

              {/* Project */}
              <td className="px-6 py-5 text-gray-700 dark:text-zinc-300">
                {lead.projectType || "-"}
              </td>

              {/* Budget */}
              <td className="px-6 py-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 font-medium text-green-700 dark:bg-green-500/15 dark:text-green-400">
                  ₹{lead.budget}
                </span>
              </td>

              {/* Timeline */}
              <td className="px-6 py-5 text-gray-700 dark:text-zinc-300">
                {lead.timeline || "-"}
              </td>

              {/* Score */}
              <td className="px-6 py-5">
                <span
                  className={`px-4 py-2 rounded-full font-bold text-white ${
                    (lead.score ?? 0) >= 80
                      ? "bg-green-500"
                      : (lead.score ?? 0) >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {lead.score}
                </span>
              </td>

              {/* Status */}
              <td className="px-6 py-5">
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                >
                  <option value="New">New</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </td>

              {/* AI Email */}
              <td className="px-6 py-5">
                <button
                  onClick={() => generateEmail(lead)}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  🤖 Generate Email
                </button>
              </td>

              {/* Proposal */}
              <td className="px-6 py-5">
                <ProposalButton lead={lead} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}