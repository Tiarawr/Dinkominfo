import React from "react";

export default function Header() {
  return (
    
    <div className="relative justify-start items-center gap-[234px] w-full px-8 py-4 bg-white">
      <img
        className="w-20 h-[101px]"
        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Coat_of_arms_of_Pekalongan_Regency.svg"
        alt="Logo"
      />
      <div className="flex justify-start items-center gap-[58px]">
        <div className="text-black text-2xl font-Figtree font-semibold">
          Beranda
        </div>
        <div className="text-black text-2xl font-Figtree font-semibold">
          E-Book
        </div>
        <div className="text-black text-2xl font-Figtree font-semibold">
          E-Kliping
        </div>
        <div className="text-black text-2xl font-Figtree font-semibold">
          Tentang
        </div>
        <div className="text-black text-2xl font-Figtree font-semibold">
          Kontak
        </div>
      </div>
      <div>
        <svg
          width="62"
          height="31"
          viewBox="0 0 62 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="1" width="61" height="29" rx="14.5" stroke="black" />
          <circle cx="15" cy="15.5" r="12" fill="#EAAD32" />
        </svg>
      </div>
    </div>
  );
}
