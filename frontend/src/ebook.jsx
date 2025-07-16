import React from "react";
import Headers from "./components/Header";
import Footer from "./components/Footer";
import feather from "feather-icons";

const DataArtikel = [
  {
    title: "Artikel 1",
    description: "Deskripsi singkat tentang artikel 1.",
    image: "https://via.placeholder.com/150",
    link: "#",
  },
  {
    title: "Artikel 2",
    description: "Deskripsi singkat tentang artikel 2.",
    image: "https://via.placeholder.com/150",
    link: "#",
  },
  {
    title: "Artikel 3",
    description: "Deskripsi singkat tentang artikel 3.",
    image: "https://via.placeholder.com/150",
    link: "#",
  },
];

export default function EBook() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#181A2A] dark:text-white pt-24">
      <Headers />
      <div flex className="text-3xl text-center font-semibold mb-8 mt-8">
        <h1>Portal E-Book Resmi Kabupaten Pekalongan</h1>
      </div>

      <div className="flex justify-center items-center mb-8">
        <label className="input bg-pink-100 rounded-2xl">
          <span
            dangerouslySetInnerHTML={{
              __html: feather.icons.search.toSvg({
                class: "h-5 w-5 opacity-50 text-pink-500",
              }),
            }}
          />
          <input
            type="search"
            className="grow dark:text-black"
            placeholder="Cari berdasarkan judul atau kata kunci"
          />
        </label>
      </div>
      <main className="flex-1 px-8">
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DataArtikel.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#141624] rounded-3xl shadow-lg border-2 border-gray-300 overflow-hidden"
              >
                <img
                  className="w-full h-80 object-cover"
                  src={item.image}
                  alt="Article"
                />
                <div className="p-5">
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p className="text-black dark:text-white mb-4">{item.description}</p>
                  <a
                    href={item.link}
                    className="btn btn-primary border-0 bg-blue-600 text-white px-4 py-2 rounded-md font-bold text-sm"
                  >
                    Baca Selengkapnya
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
