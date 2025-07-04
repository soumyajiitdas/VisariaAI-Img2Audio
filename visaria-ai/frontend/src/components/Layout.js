"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("dark-mode");
    if (stored === "true") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-300 dark:border-gray-700 shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-primary-light dark:text-primary-dark tracking-tight">
          Visaria<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">AI</span>
        </h1>

        <div className="space-x-4 flex items-center">
          <NavLink href="/" label="Home" active={router.pathname === "/"} />
          <NavLink href="/about" label="About" active={router.pathname === "/about"} />

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1.5 text-sm rounded bg-indigo-100 dark:bg-gray-700 text-indigo-700 dark:text-white hover:scale-105 transition"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 py-10 max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
}

// Reusable NavLink Component
function NavLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition hover:text-indigo-600 dark:hover:text-violet-400 ${
        active ? "underline underline-offset-4 font-semibold" : ""
      }`}
    >
      {label}
    </Link>
  );
}

