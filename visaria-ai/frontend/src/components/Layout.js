"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../pages/_app'; // Import ThemeContext

export default function Layout({ children }) {
  const router = useRouter();
  const { theme, toggleTheme } = useContext(ThemeContext); // Use ThemeContext

  return (
    <div className="min-h-screen transition-colors duration-300 bg-background text-text">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-card-border shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-primary">
          Visaria<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">AI</span>
        </h1>

        <div className="space-x-4 flex items-center">
          <NavLink href="/" label="Home" active={router.pathname === "/"} />
          <NavLink href="/about" label="About" active={router.pathname === "/about"} />

          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 text-sm rounded bg-button text-button-text hover:bg-button-hover transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-1"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />} {theme === 'light' ? "Dark" : "Light"}
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
      className={`text-sm font-medium transition-all duration-300 ease-in-out hover:text-primary ${
        active ? "underline underline-offset-4 font-semibold text-primary" : "text-text"
      }`}
    >
      {label}
    </Link>
  );
}

