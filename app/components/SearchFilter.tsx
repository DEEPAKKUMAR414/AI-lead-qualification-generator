import { FiSearch, FiFilter } from "react-icons/fi";

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
    <div className="mb-8 flex flex-col gap-5 md:flex-row">
      {/* Search */}
      <div className="relative flex-1">
        <FiSearch
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500"
          size={20}
        />

        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20 dark:hover:border-zinc-700 dark:hover:shadow-black/40"
        />
      </div>

      {/* Filter */}
      <div className="relative">
        <FiFilter
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500"
          size={18}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20 dark:hover:border-zinc-700 dark:hover:shadow-black/40"
        >
          <option value="All">All Leads</option>
          <option value="New">New</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </div>
    </div>
  );
}