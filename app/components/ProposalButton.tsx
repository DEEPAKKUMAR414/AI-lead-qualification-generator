"use client";

import jsPDF from "jspdf";

type Lead = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  features: string;
};

export default function ProposalButton({
  lead,
}: {
  lead: Lead;
}) {
  const generateProposal = async () => {
    try {
      const response = await fetch("/api/proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to generate proposal");
        return;
      }

      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text("AI Project Proposal", 20, 20);

      doc.setFontSize(12);

      const lines = doc.splitTextToSize(
        data.proposal,
        170
      );

      doc.text(lines, 20, 35);

      doc.save(`${lead.name}-Proposal.pdf`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <button
      onClick={generateProposal}
      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg"
    >
      📄 AI Proposal
    </button>
  );
}