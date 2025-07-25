import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#181A2A] dark:text-white pt-24">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white/70 dark:bg-[#23244a]/80 rounded-3xl shadow-xl p-8 mt-8 mb-8 border border-blue-200 dark:border-blue-400">
          <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-4 text-center">
            Tentang Portal Dinkominfo Pekalongan
          </h1>
          <p className="text-lg text-blue-900 dark:text-blue-100 mb-6 text-center">
            Portal ini merupakan pusat informasi digital resmi Dinas Komunikasi
            dan Informatika Kabupaten Pekalongan. Kami menyediakan berbagai
            layanan publik, e-book, berita, dan dokumentasi digital untuk
            mendukung transparansi, inovasi, dan pelayanan masyarakat.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <img
              src="https://cdn.pekalongankab.go.id/uploads/dinas_98e2f2b35f.ico"
              alt="Logo Pekalongan"
              className="w-28 h-28 object-contain"
            />
            <div>
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                Visi
              </h2>
              <p className="text-blue-800 dark:text-blue-200 mb-4">
                Menjadi pelopor transformasi digital pelayanan publik di
                Kabupaten Pekalongan.
              </p>
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                Misi
              </h2>
              <ul className="list-disc list-inside text-blue-800 dark:text-blue-200">
                <li>Meningkatkan akses informasi digital untuk masyarakat.</li>
                <li>Mendukung inovasi dan kolaborasi digital.</li>
                <li>
                  Menyediakan layanan publik yang mudah, cepat, dan transparan.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
