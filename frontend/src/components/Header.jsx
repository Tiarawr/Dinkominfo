import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  
  const linkClass = (path) => {
    return location.pathname === path 
      ? "text-[hsl(221.2,83.2%,53.3%)] text-base font-semibold transition-colors"
      : "text-black text-base font-semibold hover:text-[hsl(221.2,83.2%,53.3%)] transition-colors";
  };

  return (
    <header className="min-h-16 top-0 left-0 z-40 flex flex-col w-full fixed items-center dark:bg-background-2 dark:shadow-sticky-dark bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm animate-in slide-in-from-top-6 transition duration-500 ease-in-out px-4 py-3 md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
      <div className="flex items-center">
        <a href="https://dinkominfo.pekalongankab.go.id/" className="header-logo block w-max py-3">
        <img
          className="w-auto min-h-10 max-h-14"
          src="https://cdn.pekalongankab.go.id/uploads/dinas_98e2f2b35f.ico"
          alt="Logo"
        />
        </a>
      </div>
      <nav className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8">
        <Link to="/" className={linkClass("/")}>
          Beranda
        </Link>
        <Link to="/e-book" className={linkClass("/e-book")}>
          E-Book
        </Link>
        <Link to="/e-kliping" className={linkClass("/e-kliping")}>
          E-Kliping
        </Link>
        <a href="#" className="text-black text-base font-semibold hover:text-[hsl(221.2,83.2%,53.3%)] transition-colors">
          Tentang
        </a>
        <a href="https://dinkominfo.pekalongankab.go.id/kontak" className="text-black text-base font-semibold hover:text-[hsl(221.2,83.2%,53.3%)] transition-colors">
          Kontak
        </a>
      </nav>
      <div className="btn btn-circle btn-ghost hover:bg-gray-200 flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      </div>
    </header>
  );
}
