"use client";

import ThemeToggle from "./ThemeToggle";
import { FiBell, FiSearch } from "react-icons/fi";

type TopbarProps = {
  exportCSV: () => void;
};

export default function Topbar({ exportCSV }: TopbarProps) {
  return (
    <header className="mb-8 flex items-center justify-between rounded-3xl border border-gray-200 bg-white px-8 py-5 shadow-sm transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Left */}
      <div>
        <p className="font-semibold text-blue-600 dark:text-blue-400">
          👋 Welcome Back
        </p>

        <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          AI Lead Dashboard
        </h1>

        <p className="mt-2 text-gray-500 dark:text-zinc-400">
          Manage leads, proposals and AI follow-ups.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500"
            size={18}
          />

          <input
            placeholder="Search..."
            className="w-72 rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:bg-zinc-900"
          />
        </div>

        {/* Export Button */}
        <button
          onClick={exportCSV}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          📥 Export CSV
        </button>

        {/* Notifications */}
        <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800">
          <FiBell
            size={21}
            className="text-gray-700 dark:text-zinc-300"
          />
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile */}
        <div className="flex items-center gap-3 rounded-2xl border border-transparent px-2 py-1 transition-all duration-300 hover:border-gray-200 dark:hover:border-zinc-700">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-bold text-white shadow-md">
            D
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Deepak
            </p>

            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              ● Online
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}