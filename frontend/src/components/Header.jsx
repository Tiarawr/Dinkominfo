// components/Header.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeSwitch";

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = (path) => {
    const isActive = location.pathname === path;
    return `text-base font-semibold transition-colors block py-2 md:py-0 ${
      isActive
        ? "text-[hsl(221.2,83.2%,53.3%)]"
        : "text-gray-900 dark:text-gray-100 hover:text-[hsl(221.2,83.2%,53.3%)]"
    }`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="min-h-16 top-0 left-0 z-40 w-full fixed bg-white/80 dark:bg-[#141624]/80 shadow-sticky backdrop-blur-sm animate-in slide-in-from-top-6 transition duration-500 ease-in-out">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="https://dinkominfo.pekalongankab.go.id/"
              className="header-logo block w-max py-3"
            >
              <img
                className="w-auto min-h-10 max-h-14"
                src="https://cdn.pekalongankab.go.id/uploads/dinas_98e2f2b35f.ico"
                alt="Logo"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={linkClass("/")}>
              Beranda
            </Link>
            <Link to="/perpustakaan" className={linkClass("/perpustakaan")}>
              Perpustakaan{" "}
            </Link>
            <Link to="/about" className={linkClass("/about")}>
              Tentang
            </Link>
            <Link to="/contact" className={linkClass("/kontak")}>
              Kontak
            </Link>
          </nav>

          {/* Desktop Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex justify-center items-center transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`text-gray-700 dark:text-gray-300 transition-transform duration-300 ${
                  isMenuOpen ? "rotate-90" : ""
                }`}
              >
                {isMenuOpen ? (
                  <>
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </>
                ) : (
                  <>
                    <path d="M3 12h18"></path>
                    <path d="M3 6h18"></path>
                    <path d="M3 18h18"></path>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 mt-4 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col space-y-1 border-t border-gray-200 dark:border-gray-700 pt-4">
            <Link
              to="/"
              className={linkClass("/")}
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              to="/perpustakaan"
              className={linkClass("/perpustakaan")}
              onClick={() => setIsMenuOpen(false)}
            >
              Perpustakaan{" "}
            </Link>
            <a
              href="#"
              className="text-gray-900 dark:text-gray-100 text-base font-semibold hover:text-[hsl(221.2,83.2%,53.3%)] transition-colors block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang
            </a>
            <a
              href="https://dinkominfo.pekalongankab.go.id/kontak"
              className="text-gray-900 dark:text-gray-100 text-base font-semibold hover:text-[hsl(221.2,83.2%,53.3%)] transition-colors block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontak
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
