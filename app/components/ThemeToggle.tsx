"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="w-12 h-12 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition flex items-center justify-center"
    >
      {theme === "dark" ? (
        <FiSun size={20} className="text-yellow-400" />
      ) : (
        <FiMoon size={20} className="text-slate-700" />
      )}
    </button>
  );
}