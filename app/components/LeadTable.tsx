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
    <table className="w-full border-collapse">

      <thead>

        <tr className="border-b bg-gray-50">

          <th className="text-left p-3">Name</th>
          <th className="text-left p-3">Email</th>
          <th className="text-left p-3">Project</th>
          <th className="text-left p-3">Budget</th>
          <th className="text-left p-3">Timeline</th>
          <th className="text-left p-3">Score</th>
          <th className="text-left p-3">Status</th>
          <th className="text-left p-3">AI Email</th>
          <th className="text-left p-3">Proposal</th>

        </tr>

      </thead>

      <tbody>

        {leads.map((lead) => (

          <tr
            key={lead.id}
            className="border-b hover:bg-gray-50"
          >

            <td className="p-3">
              {lead.name || "-"}
            </td>

            <td className="p-3">
              {lead.email || "-"}
            </td>

            <td className="p-3">
              {lead.projectType || "-"}
            </td>

            <td className="p-3">
              {lead.budget || "-"}
            </td>

            <td className="p-3">
              {lead.timeline || "-"}
            </td>

            <td className="p-3 font-bold">
              {lead.score ?? 0}
            </td>

            <td className="p-3">

              <select
                value={lead.status}
                onChange={(e) =>
                  updateStatus(
                    lead.id,
                    e.target.value
                  )
                }
                className="border rounded-lg px-3 py-2"
              >
                <option value="New">New</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">
                  Proposal Sent
                </option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>

            </td>
            <td className="p-3">
                <button
                    onClick={() => generateEmail(lead)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                    🤖 Generate Email
                </button>
            </td>
            <td className="p-3">
                <ProposalButton lead={lead} />
            </td>
            

          </tr>

        ))}

      </tbody>

    </table>
  );
}