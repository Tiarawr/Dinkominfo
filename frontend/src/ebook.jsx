import React, { useState } from "react";
import Headers from "./components/Header";
import Footer from "./components/Footer";
import feather from "feather-icons";

const DataArtikel = [
  {
    id: 1,
    title: "E-Book Panduan Pelayanan Publik Digital",
    description:
      "Panduan lengkap tentang cara menggunakan layanan digital pemerintah daerah.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/isiebook/1",
    category: "Pelayanan Publik",
    publishDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Buku Elektronik Sejarah Pekalongan",
    description:
      "Dokumentasi sejarah dan budaya Kabupaten Pekalongan dalam format digital.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/isiebook/2",
    category: "Sejarah & Budaya",
    publishDate: "2024-02-20",
  },
  {
    id: 3,
    title: "Manual UMKM Digital Pekalongan",
    description:
      "Panduan digitalisasi untuk usaha mikro, kecil, dan menengah di Kabupaten Pekalongan.",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/isiebook/3",
    category: "Ekonomi & UMKM",
    publishDate: "2024-03-10",
  },
  {
    id: 4,
    title: "Regulasi dan Kebijakan Daerah",
    description:
      "Kompilasi peraturan daerah dan kebijakan terbaru Kabupaten Pekalongan.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/isiebook/4",
    category: "Regulasi & Hukum",
    publishDate: "2024-01-25",
  },
  {
    id: 5,
    title: "Profil Investasi Kabupaten Pekalongan",
    description:
      "Informasi lengkap peluang investasi dan potensi ekonomi daerah.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/isiebook/5",
    category: "Ekonomi & UMKM",
    publishDate: "2024-04-05",
  },
  {
    id: 6,
    title: "Panduan Wisata Digital Pekalongan",
    description:
      "E-book interaktif tentang destinasi wisata dan kuliner khas Pekalongan.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/isiebook/6",
    category: "Pariwisata",
    publishDate: "2024-03-28",
  },
];

export default function EBook() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Get unique categories
  const categories = [
    "Semua",
    ...new Set(DataArtikel.map((item) => item.category)),
  ];

  // Filter data based on search term and category
  const filteredData = DataArtikel.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#181A2A] dark:text-white pt-24">
      <Headers />
      <div className="text-3xl text-center font-semibold mb-8 mt-8">
        <h1>Portal E-Book Resmi Kabupaten Pekalongan</h1>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto px-8 mb-8">
        {/* Search Bar */}
        <div className="flex justify-center items-center mb-6">
          <label className="input bg-pink-100 rounded-2xl flex items-center">
            <span
              dangerouslySetInnerHTML={{
                __html: feather.icons.search.toSvg({
                  class: "h-5 w-5 opacity-50 text-pink-500 mr-2",
                }),
              }}
            />
            <input
              type="search"
              className="grow dark:text-black"
              placeholder="Cari berdasarkan judul atau kata kunci"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Menampilkan {filteredData.length} dari {DataArtikel.length} e-book
        </div>
      </div>

      <main className="flex-1 px-8">
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#141624] rounded-3xl shadow-lg border-2 border-gray-300 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    className="w-full h-80 object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    {item.title}
                  </h2>

                  {/* Publish Date */}
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: feather.icons.calendar.toSvg({
                          class: "h-4 w-4 mr-1",
                        }),
                      }}
                    />
                    {formatDate(item.publishDate)}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                    {item.description}
                  </p>

                  <a
                    href={item.link}
                    className="inline-flex items-center btn btn-primary border-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                  >
                    Baca Selengkapnya
                    <span
                      className="ml-2"
                      dangerouslySetInnerHTML={{
                        __html: feather.icons["arrow-right"].toSvg({
                          class: "h-4 w-4",
                        }),
                      }}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <span
                  dangerouslySetInnerHTML={{
                    __html: feather.icons["search"].toSvg({
                      class: "h-16 w-16 mx-auto opacity-50",
                    }),
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Tidak ada e-book yang ditemukan
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Coba gunakan kata kunci yang berbeda atau pilih kategori lain
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
