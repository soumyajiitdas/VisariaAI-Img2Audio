"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { ThemeContext } from '../pages/_app';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
  const router = useRouter();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-card-border shadow-sm px-4 sm:px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-primary">
          Visaria<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">AI🔊</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink href="/" label="Home" active={router.pathname === "/"} />
          <NavLink href="/about" label="About" active={router.pathname === "/about"} />
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2 p-2 rounded-md text-text">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/90 backdrop-blur-sm border-b border-card-border"
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              <NavLink href="/" label="Home" active={router.pathname === "/"} onClick={() => setIsMenuOpen(false)} />
              <NavLink href="/about" label="About" active={router.pathname === "/about"} onClick={() => setIsMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-10 max-w-8xl mx-auto">
        {children}
      </main>
    </div>
  );
}

function ThemeToggleButton({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1.5 text-sm rounded bg-button text-button-text hover:bg-button-hover transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-1"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          <span className="hidden sm:inline">{theme === 'light' ? "Dark" : "Light"}</span>
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

// Reusable NavLink Component
function NavLink({ href, label, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-lg md:text-sm font-medium transition-all duration-300 ease-in-out hover:text-primary ${
        active ? "underline underline-offset-4 font-semibold text-primary" : "text-text"
      }`}
    >
      {label}
    </Link>
  );
}

