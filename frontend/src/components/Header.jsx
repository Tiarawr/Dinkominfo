import React from "react";

export default function Header() {
  return (
    <div className="w-full bg-white px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <img
          className="w-10 h-10 md:w-12 md:h-[101px]"
          src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Coat_of_arms_of_Pekalongan_Regency.svg"
          alt="Logo"
        />
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8">
        <div className="text-black text-lg font-Figtree md:text-2xl font-semibold">
          Beranda
        </div>
        <div className="text-black text-lg font-Figtree md:text-2xl font-semibold">
          E-Book
        </div>
        <div className="text-black text-lg md:text-2xl font-semibold">
          E-Kliping
        </div>
        <div className="text-black text-lg md:text-2xl font-semibold">
          Tentang
        </div>
        <div className="text-black text-lg md:text-2xl font-semibold">
          Kontak
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <svg
          width="48"
          height="24"
          viewBox="0 0 62 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-6 md:w-[62px] md:h-[31px]"
        >
          <rect x="0.5" y="1" width="61" height="29" rx="14.5" stroke="black" />
          <circle cx="15" cy="15.5" r="12" fill="#EAAD32" />
        </svg>
      </div>
    </div>
  );
}
