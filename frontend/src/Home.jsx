import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import feather from "feather-icons";
import { useTheme } from "./components/ThemeSwitch";
import ThemeToggle from "./components/ThemeToggle";

const DataArtikel = [
  {
    title: "Artikel 1",
    description: "Deskripsi singkat tentang artikel 1.",
    image:
      "https://images.unsplash.com/photo-1752939124510-e444139e6404?q=80&w=2018&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#",
    date: "2025-05-05",
    category: "Teknologi",
  },
  {
    title: "Artikel 2",
    description: "Deskripsi singkat tentang artikel 2.",
    image:
      "https://images.unsplash.com/photo-1752986002031-579569bd3d6d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#",
    date: "2025-05-05",
    category: "Teknologi",
  },
  {
    title: "Artikel 3",
    description: "Deskripsi singkat tentang artikel 3.",
    image: "",
    link: "#",
    date: "2025-05-05",
    category: "Teknologi",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white pt-24 dark:bg-[#181A2A]">
      <Header />
      {/* Hero Section */}
      <div className="flex dark:text-white flex-col items-center justify-center text-center py-25">
        <h1 className="text-6xl font-semibold mb-8">Macapat Pekalongan</h1>
        <img
          className="w-45 h-45 mb-8"
          src="https://cdn.pekalongankab.go.id/uploads/dinas_98e2f2b35f.ico"
          alt="Logo"
        />
        <h3 className="text-2xl font-semibold text-center mb-4">
          Portal Informasi Publik Kabupaten Pekalongan
        </h3>
        <p className="text-lg text-center mb-8">
          Akses Mudah ke Majalah, E-Book, dan Kliping Resmi Pemerintah Daerah
        </p>
        <a
          className="btn btn-primary border-0 bg-[#b83e3e] text-white hover:text-white hover:bg-[#922e2e] text-lg font-semibold px-8 py-3 rounded-full"
          href="#"
        >
          Lihat Publikasi
        </a>
      </div>

      {/* Publications Section */}
      <div className="px-8 mb-8">
        <h1 className="text-4xl text-black dark:text-white hover:text-pink-400 font-semibold text-left mb-8">
          Publikasi Unggulan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DataArtikel.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#181A2A] rounded-3xl shadow-lg border-2 border-gray-300 overflow-hidden"
            >
              <img
                className="w-full h-80 object-cover"
                src={item.image}
                alt="Article"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-black dark:text-white mb-4 leading-tight">
                  {item.title}
                </h2>
                <p className="text-base text-black dark:text-white mb-6 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href={item.link}
                    className="btn btn-ghost bg-blue-600 text-white px-4 py-2 rounded-md font-bold text-sm"
                  >
                    Artikel
                  </a>
                  <span className="text-black dark:text-white font-bold text-lg">
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-8 mb-8">
        <h1 className="text-4xl dark:text-white text-black font-semibold text-left mb-8">
          Tentang Portal
        </h1>
        <p className="text-xl dark:text-white text-black mt-6 pr-24">
          Dummy PKL adalah layanan dokumentasi dan publikasi digital resmi dari
          Dinas Komunikasi dan Informatika Kabupaten Pekalongan. Melalui portal
          ini, masyarakat dapat mengakses berbagai informasi dan laporan resmi
          dengan mudah dan cepat.
        </p>
      </div>
      <Footer />
    </div>
  );
}
