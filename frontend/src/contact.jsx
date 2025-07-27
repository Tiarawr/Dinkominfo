import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#181A2A] dark:text-white pt-24">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white/70 dark:bg-[#23244a]/80 rounded-3xl shadow-xl p-8 mt-8 mb-8 border border-blue-200 dark:border-blue-400">
          <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-4 text-center">
            Kontak Kami
          </h1>
          <p className="text-lg text-blue-900 dark:text-blue-100 mb-8 text-center">
            Hubungi Dinas Komunikasi dan Informatika Kabupaten Pekalongan untuk
            pertanyaan, saran, atau kerjasama.
          </p>
          <div className="space-y-4 text-center text-blue-700 dark:text-blue-300 text-lg">
            <div>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:kominfo@pekalongankab.go.id"
                className="underline"
              >
                dinkominfo@pekalongankab.go.id
              </a>
            </div>
            <div>
              <span className="font-semibold">Telepon:</span> (0285) 381781
            </div>
            <div>
              <span className="font-semibold">Alamat:</span> Jl. Krakatau No. 2,
              Kec. Kajen, Kabupaten Pekalongan
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
