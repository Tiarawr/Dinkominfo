import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

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

// Blob component
const Blob = ({ className, style }) => (
  <div
    className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob ${className}`}
    style={style}
  />
);

export default function Home() {
  return (
    <div className="flex flex-col overflow-auto min-h-screen scrollbar-hidden bg-white pt-24 dark:bg-[#181A2A]">
      <Header />

      {/* Hero Section with Blobs */}
      <div className="relative flex dark:text-white flex-col items-center justify-center text-center py-25 overflow-hidden">
        {/* Animated Blobs Background */}
        <Blob
          className="bg-blue-300 dark:bg-blue-600"
          style={{
            top: "10%",
            left: "10%",
            width: "300px",
            height: "300px",
            animationDelay: "0s",
          }}
        />
        <Blob
          className="bg-blue-400 dark:bg-blue-500"
          style={{
            top: "20%",
            right: "10%",
            width: "250px",
            height: "250px",
            animationDelay: "2s",
          }}
        />
        <Blob
          className="bg-blue-200 dark:bg-blue-700"
          style={{
            bottom: "10%",
            left: "20%",
            width: "200px",
            height: "200px",
            animationDelay: "4s",
          }}
        />
        <Blob
          className="bg-blue-500 dark:bg-blue-400"
          style={{
            bottom: "20%",
            right: "20%",
            width: "280px",
            height: "280px",
            animationDelay: "6s",
          }}
        />

        {/* Hero Content - Logo tetap di tengah */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-6xl font-semibold mb-8">Macapat Pekalongan</h1>
          <img
            className="w-45 h-45 mb-8 mx-auto"
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
            className="btn btn-primary border-0 bg-[#b83e3e] text-white hover:text-white hover:bg-[#922e2e] text-lg font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            href="#"
          >
            Lihat Publikasi
          </a>
        </div>
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

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
}
