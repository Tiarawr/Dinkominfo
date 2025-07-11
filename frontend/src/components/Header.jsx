import React from "react";

export default function TestDaisyButton() {
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
        <a href="https://dinkominfo.pekalongankab.go.id/" className="text-black text-base font-semibold hover:text-[hsl(221.2,83.2%,53.3%)] transition-colors">
          Beranda
        </a>
        <a href="#" className="text-black text-base font-semibold hover:text-[hsl(221.2,83.2%,53.3%)] transition-colors">
          E-Book
        </a>
        <a href="$" className="text-black text-base font-semibold hover:text-[hsl(221.2,83.2%,53.3%)] transition-colors">
          E-Kliping
        </a>
        <a href="#" className="text-black text-base font-semibold hover:text-[hsl(221.2,83.2%,53.3%)] transition-colors">
          Tentang
        </a>
        <a href="https://dinkominfo.pekalongankab.go.id/kontak" className="text-black text-base font-semibold hover:text-[hsl(221.2,83.2%,53.3%)] transition-colors">
          Kontak
        </a>
      </nav>
      <div className="flex justify-center md:justify-end">
        <svg
          width="48"
          height="24"
          viewBox="0 0 62 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-6 md:w-[62px] md:h-[31px]"
        >
          <rect
            x="0.5"
            y="1"
            width="61"
            height="29"
            rx="14.5"
            stroke="black"
          />
          <circle cx="15" cy="15.5" r="12" fill="#EAAD32" />
        </svg>
      </div>
    </header>
  );
}
