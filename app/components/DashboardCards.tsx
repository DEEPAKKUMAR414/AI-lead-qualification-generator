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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-600">
          Total Leads
        </h2>
        <p className="text-4xl font-bold text-blue-600 mt-2">
          {totalLeads}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-600">
          High Quality Leads
        </h2>
        <p className="text-4xl font-bold text-green-600 mt-2">
          {highQualityLeads}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-600">
          Average Score
        </h2>
        <p className="text-4xl font-bold text-purple-600 mt-2">
          {averageScore}
        </p>
      </div>
    </div>
  );
}