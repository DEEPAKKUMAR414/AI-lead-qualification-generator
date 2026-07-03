"use client";

import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import DashboardCards from "../components/DashboardCards";
import SearchFilter from "../components/SearchFilter";
import LeadTable from "../components/LeadTable";
import AnalyticsChart from "../components/AnalyticsChart";
import EmailModal from "../components/EmailModal";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/leads");
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeads();
  }, []);

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await fetch("/api/leads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id
            ? {
                ...lead,
                status,
              }
            : lead
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const generateEmail = async (lead: Lead) => {
  try {
    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Failed to generate email");
      return;
    }

    setGeneratedEmail(data.email);
    setShowModal(true);

    console.log("Generated Email:");
    console.log(data.email);

  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};
  const totalLeads = leads.length;

  const highQualityLeads = leads.filter(
    (lead) => (lead.score ?? 0) >= 80
  ).length;

  const averageScore =
    leads.length > 0
      ? Math.round(
          leads.reduce(
            (sum, lead) => sum + (lead.score ?? 0),
            0
          ) / leads.length
        )
      : 0;

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      lead.email
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    
    const headers = [
      "Name",
      "Email",
      "Project",
      "Budget",
      "Timeline",
      "Status",
      "Score",
    ];

    const rows = filteredLeads.map((lead) => [
      lead.name ?? "",
      lead.email ?? "",
      lead.projectType ?? "",
      lead.budget ?? "",
      lead.timeline ?? "",
      lead.status ?? "",
      lead.score ?? 0,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "leads.csv");
  };

  const chartData = {
    labels: [
      "New",
      "Qualified",
      "Proposal Sent",
      "Won",
      "Lost",
    ],
    datasets: [
      {
        label: "Number of Leads",
        data: [
          leads.filter((l) => l.status === "New").length,
          leads.filter((l) => l.status === "Qualified").length,
          leads.filter(
            (l) => l.status === "Proposal Sent"
          ).length,
          leads.filter((l) => l.status === "Won").length,
          leads.filter((l) => l.status === "Lost").length,
        ],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#22C55E",
          "#EF4444",
        ],
        borderRadius: 8,
      },
    ],
  };

  return (
  <main className="min-h-screen bg-gray-100 p-8">

    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">
        Lead Dashboard
      </h1>

      <button
        onClick={exportCSV}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
      >
        📥 Export CSV
      </button>
    </div>

    {/* Dashboard Cards */}

    <DashboardCards
  totalLeads={totalLeads}
  highQualityLeads={highQualityLeads}
  averageScore={averageScore}
    />

    {/* Analytics */}

    <AnalyticsChart chartData={chartData} />
    {/* Lead Table */}

    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Recent Leads
        </h2>

      </div>

    <SearchFilter
  search={search}
  setSearch={setSearch}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
    />

      <LeadTable
  leads={filteredLeads}
  updateStatus={updateStatus}
  generateEmail={generateEmail}
/>

    </div>
    {showModal && (
  <EmailModal
    email={generatedEmail}
    onClose={() => setShowModal(false)}
  />
)}
  </main>
);
}