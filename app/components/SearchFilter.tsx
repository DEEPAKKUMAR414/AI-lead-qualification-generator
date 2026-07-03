type SearchFilterProps = {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
};

export default function SearchFilter({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: SearchFilterProps) {
  return (
    <div className="flex gap-4 mb-6">

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border rounded-lg p-3"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded-lg p-3"
      >
        <option value="All">All</option>
        <option value="New">New</option>
        <option value="Qualified">Qualified</option>
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
      </select>

    </div>
  );
}