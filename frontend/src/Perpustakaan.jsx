import React, { useState, useEffect } from "react";
import {
  Search,
  Book,
  Newspaper,
  Calendar,
  Clock,
  Eye,
  Filter,
  Menu,
  X,
  Moon,
  Sun,
  BookOpen,
  ArrowLeft,
  Home,
  Phone,
  Info,
} from "lucide-react";

// Import Header dan Footer dari file terpisah
import Header from "./components/Header";
import Footer from "./components/Footer";
// Import komponen IsiEbook dan IsiEkliping
import IsiEbook from "./components/IsiEbook";
import IsiEkliping from "./components/IsiEkliping";

// Sample cover images for demo
const sampleCovers = {
  ebook1:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
  ebook2:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
  ebook3:
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
  ekliping1:
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=600&fit=crop",
  ekliping2:
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop",
  ekliping3:
    "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=600&fit=crop",
};

// Component untuk halaman E-Book utama
function PerpustakaanPage({ onViewContent }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [items, setItems] = useState([]);

  // Load data dari state (simulasi localStorage)
  useEffect(() => {
    // Simulasi data untuk demo dengan cover images
    const demoItems = [
      {
        id: 1,
        title: "Panduan Lengkap React untuk Pemula",
        author: "John Doe",
        description:
          "Buku komprehensif untuk mempelajari React dari dasar hingga mahir. Cocok untuk developer yang ingin menguasai library JavaScript populer ini.",
        category: "e-book",
        timestamp: Date.now() - 86400000,
        readTime: "2 jam",
        createdBy: "Admin Perpustakaan",
        coverImage: sampleCovers.ebook1,
        content: `**Bab 1: Pengenalan React**

React adalah library JavaScript yang dikembangkan oleh Facebook untuk membangun user interface yang interaktif. Library ini menggunakan konsep component-based architecture yang memungkinkan developer untuk membangun aplikasi web yang kompleks dengan cara yang lebih terstruktur dan mudah dipelihara.

**Fitur Utama React:**
• Virtual DOM untuk performa yang optimal
• Component-based architecture
• Unidirectional data flow
• JSX syntax yang mudah dipahami
• Rich ecosystem dan community support

**Mengapa Memilih React?**

React telah menjadi pilihan utama banyak developer karena kemudahan penggunaannya dan performa yang excellent. Dengan React, Anda dapat membangun aplikasi web modern yang responsive dan user-friendly.

**Memulai dengan React**

Untuk memulai belajar React, Anda perlu memahami konsep dasar JavaScript terlebih dahulu. Setelah itu, Anda dapat mulai mempelajari JSX, komponen, props, dan state management.`,
      },
      {
        id: 2,
        title: "Perkembangan AI di Indonesia Tahun 2024",
        author: "Tech News Indonesia",
        description:
          "Kumpulan berita dan analisis tentang perkembangan kecerdasan buatan di Indonesia sepanjang tahun 2024.",
        category: "e-kliping",
        timestamp: Date.now() - 43200000,
        readTime: "15 menit",
        createdBy: "Editor Teknologi",
        coverImage: sampleCovers.ekliping1,
        content: `**Pertumbuhan Pesat AI di Indonesia**

Tahun 2024 menjadi tahun yang sangat penting bagi perkembangan kecerdasan buatan (AI) di Indonesia. Berbagai sektor mulai mengadopsi teknologi AI untuk meningkatkan efisiensi dan produktivitas.

**Sektor yang Mengadopsi AI:**
1. Perbankan - Untuk deteksi fraud dan customer service
2. Healthcare - Diagnosa medis dan telemedicine
3. Pendidikan - Platform pembelajaran adaptif
4. Transportasi - Sistem navigasi pintar

**Tantangan dan Peluang**

Meskipun perkembangannya pesat, Indonesia masih menghadapi beberapa tantangan dalam implementasi AI, termasuk ketersediaan SDM yang kompeten dan infrastruktur teknologi yang memadai.

Namun, dengan dukungan pemerintah dan investasi swasta yang terus meningkat, masa depan AI di Indonesia terlihat sangat menjanjikan.

**Dampak terhadap Ekonomi**

Implementasi AI diperkirakan dapat meningkatkan GDP Indonesia hingga 15% dalam 10 tahun ke depan. Hal ini tentunya menjadi peluang besar bagi pengembangan ekonomi digital nasional.`,
        sourceUrl: "https://technews.id/ai-indonesia-2024",
      },
      {
        id: 3,
        title: "Manajemen Keuangan untuk UMKM",
        author: "Dr. Siti Rahayu",
        description:
          "Panduan praktis manajemen keuangan untuk usaha mikro, kecil, dan menengah di era digital.",
        category: "e-book",
        timestamp: Date.now() - 172800000,
        readTime: "1.5 jam",
        createdBy: "Admin Ekonomi",
        coverImage: sampleCovers.ebook2,
        content: `**Pentingnya Manajemen Keuangan untuk UMKM**

Manajemen keuangan yang baik adalah kunci kesuksesan bagi setiap usaha, termasuk UMKM. Dengan pengelolaan keuangan yang tepat, UMKM dapat berkembang secara berkelanjutan dan menghadapi berbagai tantangan bisnis.

**Prinsip Dasar Manajemen Keuangan UMKM:**
• Pemisahan keuangan pribadi dan bisnis
• Pencatatan yang rapi dan sistematis
• Perencanaan cash flow yang realistis
• Diversifikasi sumber pendapatan
• Kontrol pengeluaran yang ketat

**Tips Praktis:**

1. **Gunakan Aplikasi Keuangan Digital** - Manfaatkan teknologi untuk memudahkan pencatatan dan monitoring keuangan.

2. **Buat Budget Bulanan** - Rencanakan pendapatan dan pengeluaran setiap bulan dengan detail.

3. **Siapkan Dana Darurat** - Sisihkan minimal 10% dari keuntungan untuk dana darurat bisnis.

**Langkah-langkah Implementasi**

Mulailah dengan langkah sederhana seperti mencatat semua transaksi harian, kemudian tingkatkan dengan menggunakan tools digital untuk analisis yang lebih mendalam.`,
      },
      {
        id: 4,
        title: "Tren Digital Marketing 2024",
        author: "Marketing Today",
        description:
          "Analisis mendalam tentang tren pemasaran digital yang akan mendominasi tahun 2024.",
        category: "e-kliping",
        timestamp: Date.now() - 259200000,
        readTime: "20 menit",
        createdBy: "Tim Marketing",
        coverImage: sampleCovers.ekliping2,
        content: `**Revolusi Digital Marketing di 2024**

Tahun 2024 membawa perubahan signifikan dalam landscape digital marketing. Berbagai teknologi baru dan perubahan perilaku konsumen menciptakan peluang dan tantangan baru bagi marketer.

**Tren Utama 2024:**
• AI-powered personalization
• Voice search optimization
• Interactive content dan AR/VR
• Sustainability marketing
• Micro dan nano influencer marketing

**Strategi yang Efektif**

Marketer harus beradaptasi dengan cepat terhadap perubahan algoritma platform media sosial dan meningkatnya ekspektasi konsumen terhadap pengalaman yang personal dan relevan.`,
        sourceUrl: "https://marketingtoday.com/trends-2024",
      },
      {
        id: 5,
        title: "Pemrograman Python untuk Data Science",
        author: "Prof. Ahmad Wijaya",
        description:
          "Panduan komprehensif menggunakan Python untuk analisis data dan machine learning.",
        category: "e-book",
        timestamp: Date.now() - 345600000,
        readTime: "3 jam",
        createdBy: "Fakultas Ilmu Komputer",
        coverImage: sampleCovers.ebook3,
        content: `**Pengenalan Data Science dengan Python**

Python telah menjadi bahasa pemrograman pilihan utama untuk data science berkat ecosystem library yang kaya dan syntax yang mudah dipahami.

**Library Utama:**
• Pandas untuk manipulasi data
• NumPy untuk operasi numerik
• Matplotlib dan Seaborn untuk visualisasi
• Scikit-learn untuk machine learning
• TensorFlow dan PyTorch untuk deep learning

**Langkah Awal**

Memulai journey dalam data science memerlukan pemahaman yang solid tentang statistik, matematika, dan tentunya kemampuan programming yang baik.`,
      },
      {
        id: 6,
        title: "Inovasi Teknologi Pendidikan Indonesia",
        author: "Edukasi Digital",
        description:
          "Laporan komprehensif tentang perkembangan teknologi pendidikan di Indonesia.",
        category: "e-kliping",
        timestamp: Date.now() - 432000000,
        readTime: "25 menit",
        createdBy: "Peneliti Pendidikan",
        coverImage: sampleCovers.ekliping3,
        content: `**Transformasi Digital dalam Pendidikan**

Pandemi COVID-19 telah mempercepat adopsi teknologi dalam dunia pendidikan Indonesia. Berbagai inovasi bermunculan untuk mendukung pembelajaran jarak jauh.

**Inovasi Terdepan:**
1. Platform pembelajaran adaptif
2. Virtual reality dalam pembelajaran
3. AI untuk personalisasi kurikulum
4. Gamifikasi dalam edukasi
5. Blockchain untuk sertifikasi

**Dampak Positif**

Teknologi pendidikan tidak hanya memudahkan akses pembelajaran tetapi juga meningkatkan engagement dan efektivitas proses belajar mengajar.`,
        sourceUrl: "https://edukasidigital.id/inovasi-edtech",
      },
    ];

    setItems(demoItems);
  }, []);

  // Filter categories
  const categories = [
    { id: "all", name: "Semua", icon: Filter },
    { id: "e-book", name: "E-Book", icon: Book },
    { id: "e-kliping", name: "E-Kliping", icon: Newspaper },
  ];

  // Filter data berdasarkan pencarian dan kategori
  const filteredData = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Format tanggal
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header />

      {/* Hero Section - dengan padding top untuk menghindari overlap dengan header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Portal Digital Library
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Koleksi E-Book dan E-Kliping Resmi Kabupaten Pekalongan
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Cari berdasarkan judul, deskripsi, atau penulis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    <Icon size={16} />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Results count */}
            <div className="text-gray-600 dark:text-gray-400">
              Menampilkan {filteredData.length} dari {items.length} konten
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {searchTerm ? "Tidak ada hasil pencarian" : "Belum ada konten"}
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {searchTerm
                ? `Coba gunakan kata kunci yang berbeda untuk pencarian "${searchTerm}"`
                : "Konten sedang dalam proses pengembangan"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    src={item.coverImage}
                    alt={item.title}
                    onError={(e) => {
                      // Fallback jika gambar gagal load
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          ${
                            item.category === "e-book"
                              ? '<svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/></svg>'
                              : '<svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>'
                          }
                        </div>
                      `;
                    }}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.category === "e-book"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                      }`}
                    >
                      {item.category === "e-book" ? "E-Book" : "E-Kliping"}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {item.category === "e-book" ? "oleh" : "dari"} {item.author}
                  </p>

                  {/* Publish Date & Read Time */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(item.timestamp)}
                    </span>
                    {item.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {item.readTime}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <button
                    onClick={() => onViewContent(item)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                  >
                    <Eye size={16} />
                    Baca Selengkapnya
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Component untuk membaca konten detail
function ContentReader({ item, onBack }) {
  return (
    <div className="min-h-screen">
      {/* Render komponen yang sesuai berdasarkan kategori */}
      {item.category === "e-book" ? (
        <IsiEbook
          item={item}
          onBack={onBack}
          onNavigateToLibrary={onBack}
          onSelectBook={(book) => {
            // Handle navigation ke book lain jika diperlukan
            console.log("Navigate to book:", book);
          }}
        />
      ) : (
        <IsiEkliping item={item} onBack={onBack} />
      )}
    </div>
  );
}

// Main Component
export default function Perpustakaan() {
  const [currentView, setCurrentView] = useState("list"); // 'list' or 'reader'
  const [selectedItem, setSelectedItem] = useState(null);

  const handleViewContent = (item) => {
    setSelectedItem(item);
    setCurrentView("reader");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedItem(null);
    // Reset URL back to main page
    window.history.pushState({}, "", "/perpustakaan");
  };

  if (currentView === "reader" && selectedItem) {
    return <ContentReader item={selectedItem} onBack={handleBackToList} />;
  }

  return <PerpustakaanPage onViewContent={handleViewContent} />;
}
