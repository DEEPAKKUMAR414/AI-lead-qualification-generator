export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
  Lead Dashboard
</h1>

<div className="grid grid-cols-3 gap-4 mb-8">

  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-bold">
      Total Leads
    </h2>

    <p className="text-3xl">
      2
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-bold">
      High Quality
    </h2>

    <p className="text-3xl">
      1
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-bold">
      Average Score
    </h2>

    <p className="text-3xl">
      87
    </p>
  </div>

</div>
    </main>
  );
}