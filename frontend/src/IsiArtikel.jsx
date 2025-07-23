import React from "react";
import Headers from "./components/Header";
import Footer from "./components/Footer";
import feather from "feather-icons";

// Data artikel lengkap dengan konten penuh
const artikelData = {
  id: 1,
  title:
    "Inovasi Digital Pemerintah Kabupaten Pekalongan dalam Pelayanan Publik",
  author: "Tim Redaksi Diskominfo",
  date: "15 Januari 2025",
  category: "Teknologi",
  readTime: "5 menit baca",
  mainImage:
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  content: [
    {
      type: "paragraph",
      text: "Kabupaten Pekalongan terus berkomitmen untuk memberikan pelayanan publik yang terbaik bagi masyarakat. Dalam era digitalisasi ini, berbagai inovasi teknologi telah diterapkan untuk memudahkan akses masyarakat terhadap layanan pemerintahan.",
    },
    {
      type: "heading",
      text: "Portal Digital Terintegrasi",
    },
    {
      type: "paragraph",
      text: "Salah satu terobosan terbesar adalah pengembangan portal digital terintegrasi yang memungkinkan masyarakat mengakses berbagai layanan administrasi secara online. Portal ini mencakup layanan perizinan, informasi publik, dan berbagai dokumen penting lainnya.",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption:
        "Interface portal digital Kabupaten Pekalongan yang user-friendly",
    },
    {
      type: "heading",
      text: "Aplikasi Mobile untuk Kemudahan Akses",
    },
    {
      type: "paragraph",
      text: "Tidak hanya melalui website, Pemerintah Kabupaten Pekalongan juga mengembangkan aplikasi mobile yang dapat diunduh melalui smartphone. Aplikasi ini memungkinkan masyarakat untuk mengakses layanan kapan saja dan di mana saja.",
    },
    {
      type: "paragraph",
      text: "Fitur-fitur unggulan dalam aplikasi mobile ini meliputi:",
    },
    {
      type: "list",
      items: [
        "Pengajuan surat keterangan online",
        "Informasi pembangunan terkini",
        "Laporan keluhan masyarakat",
        "Jadwal kegiatan pemerintahan",
        "Akses dokumen publik",
      ],
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Tampilan aplikasi mobile Pemerintah Kabupaten Pekalongan",
    },
    {
      type: "heading",
      text: "Dampak Positif bagi Masyarakat",
    },
    {
      type: "paragraph",
      text: "Implementasi teknologi digital dalam pelayanan publik telah memberikan dampak positif yang signifikan. Waktu pengurusan dokumen yang sebelumnya memakan waktu berhari-hari, kini dapat diselesaikan dalam hitungan jam.",
    },
    {
      type: "paragraph",
      text: "Selain itu, transparansi informasi publik juga semakin meningkat dengan adanya portal digital ini. Masyarakat dapat dengan mudah mengakses informasi mengenai anggaran, program kerja, dan berbagai kebijakan pemerintah daerah.",
    },
    {
      type: "heading",
      text: "Rencana Pengembangan ke Depan",
    },
    {
      type: "paragraph",
      text: "Pemerintah Kabupaten Pekalongan tidak berhenti sampai di sini. Berbagai rencana pengembangan sistem digital masih terus digulirkan, termasuk integrasi dengan sistem artificial intelligence untuk memberikan pelayanan yang lebih personal dan efisien.",
    },
    {
      type: "paragraph",
      text: "Dengan komitmen yang kuat terhadap inovasi dan pelayanan publik, Kabupaten Pekalongan siap menjadi pionir dalam transformasi digital pemerintahan di Indonesia.",
    },
  ],
};

// Artikel terkait
const relatedArticles = [
  {
    id: 2,
    title: "Program Smart City Kabupaten Pekalongan 2025",
    image:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "12 Januari 2025",
  },
  {
    id: 3,
    title: "Digitalisasi UMKM di Era New Normal",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "10 Januari 2025",
  },
  {
    id: 4,
    title: "Sistem Informasi Geografis untuk Perencanaan Pembangunan",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "8 Januari 2025",
  },
];

export default function Isiebook() {
  const renderContent = (item, index) => {
    switch (item.type) {
      case "paragraph":
        return (
          <p
            key={index}
            className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300"
          >
            {item.text}
          </p>
        );
      case "heading":
        return (
          <h2
            key={index}
            className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white"
          >
            {item.text}
          </h2>
        );
      case "image":
        return (
          <div key={index} className="my-8">
            <img
              src={item.src}
              alt={item.caption}
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            />
            {item.caption && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center italic">
                {item.caption}
              </p>
            )}
          </div>
        );
      case "list":
        return (
          <ul
            key={index}
            className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300 space-y-2"
          >
            {item.items.map((listItem, listIndex) => (
              <li key={listIndex} className="text-lg">
                {listItem}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#181A2A] pt-24">
      <Headers />

      <main className="flex-1 px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto mb-6">
          <nav className="flex text-sm text-gray-600 dark:text-gray-400">
            <a
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Beranda
            </a>
            <span className="mx-2">/</span>
            <a
              href="/ekliping"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              E-Kliping
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white">Artikel</span>
          </nav>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                {artikelData.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
              {artikelData.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <span
                  dangerouslySetInnerHTML={{
                    __html: feather.icons.user.toSvg({ class: "h-4 w-4" }),
                  }}
                />
                <span>{artikelData.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  dangerouslySetInnerHTML={{
                    __html: feather.icons.calendar.toSvg({ class: "h-4 w-4" }),
                  }}
                />
                <span>{artikelData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  dangerouslySetInnerHTML={{
                    __html: feather.icons.clock.toSvg({ class: "h-4 w-4" }),
                  }}
                />
                <span>{artikelData.readTime}</span>
              </div>
            </div>

            {/* Main Image */}
            <img
              src={artikelData.mainImage}
              alt={artikelData.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-8"
            />
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {artikelData.content.map((item, index) =>
              renderContent(item, index)
            )}
          </div>

          {/* Share Buttons */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Bagikan Artikel
            </h3>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <span
                  dangerouslySetInnerHTML={{
                    __html: feather.icons.facebook.toSvg({ class: "h-4 w-4" }),
                  }}
                />
                Facebook
              </button>
              <button className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
                <span
                  dangerouslySetInnerHTML={{
                    __html: feather.icons.twitter.toSvg({ class: "h-4 w-4" }),
                  }}
                />
                Twitter
              </button>
              <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <span
                  dangerouslySetInnerHTML={{
                    __html: feather.icons.share.toSvg({ class: "h-4 w-4" }),
                  }}
                />
                WhatsApp
              </button>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            Artikel Terkait
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white dark:bg-[#141624] rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {article.date}
                  </p>
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
                  >
                    Baca Selengkapnya →
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
