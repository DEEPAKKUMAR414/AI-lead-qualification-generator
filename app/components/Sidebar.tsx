"use client";

import Link from "next/link";
import {
  FiGrid,
  FiMessageSquare,
  FiBarChart2,
  FiFileText,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-gray-200 bg-white/95 backdrop-blur-xl shadow-xl transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950/95">

      {/* Logo */}
      <div className="border-b border-gray-200 p-8 dark:border-zinc-800">
        <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
          LeadIQ AI
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
           AI-powered CRM for lead qualification and sales automation.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-8">

        {/* Active */}
        <Link
          href="/dashboard"
          className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <FiGrid size={21} />
          Dashboard
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 rounded-2xl px-5 py-4 font-medium text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <FiMessageSquare size={21} />
          AI Chat
        </Link>

        <Link
          href="#"
          className="flex items-center gap-4 rounded-2xl px-5 py-4 font-medium text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <FiBarChart2 size={21} />
          Analytics
        </Link>

        <Link
          href="#"
          className="flex items-center gap-4 rounded-2xl px-5 py-4 font-medium text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <FiFileText size={21} />
          Proposals
        </Link>

        <Link
          href="#"
          className="flex items-center gap-4 rounded-2xl px-5 py-4 font-medium text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <FiSettings size={21} />
          Settings
        </Link>
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-200 p-5 dark:border-zinc-800">

        {/* User Card */}
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-bold text-white shadow-md">
            D
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Deepak
            </p>

            <p className="text-sm text-green-500 dark:text-green-400">
              ● Online
            </p>
          </div>

        </div>

        {/* Logout */}
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3 font-semibold text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white dark:border-red-900 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white">
          <FiLogOut size={18} />
          Logout
        </button>

      </div>
    </aside>
  );
}