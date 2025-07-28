import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

// API Base URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
const STORAGE_BASE_URL =
  import.meta.env.VITE_STORAGE_BASE_URL || "http://localhost:8000/storage";

// Component untuk halaman E-Book utama
function PerpustakaanPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleViewContent = (item) => {
    if (item.category === "e-book") {
      navigate(`/ebooks/${item.id}`);
    } else if (item.category === "e-kliping") {
      navigate(`/ekliping/${item.id}`);
    }
  };

  // Load data dari backend API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        
        // Fetch E-books
        const ebookResponse = await fetch(`${API_BASE_URL}/v1/ebook`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Fetch E-kliping
        const eklipingResponse = await fetch(`${API_BASE_URL}/v2/ekliping`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const allItems = [];

        // Process e-books
        if (ebookResponse.ok) {
          const ebookResult = await ebookResponse.json();
          if (ebookResult.success && ebookResult.data.data) {
            const ebooks = ebookResult.data.data.map((item) => ({
              id: item.id,
              title: item.title,
              author: item.author,
              description: item.description,
              category: "e-book",
              mainImage: item.image ? `${STORAGE_BASE_URL}/${item.image}` : "",
              coverImage: item.image ? `${STORAGE_BASE_URL}/${item.image}` : getDefaultImage("e-book"),
              content: item.content,
              file_path: item.file_path,
              timestamp: new Date(item.published_at).getTime(),
              createdBy: "Administrator",
            }));
            allItems.push(...ebooks);
          }
        }

        // Process e-kliping
        if (eklipingResponse.ok) {
          const eklipingResult = await eklipingResponse.json();
          if (eklipingResult.success && eklipingResult.data.data) {
            const ekliping = eklipingResult.data.data.map((item) => ({
              id: item.id,
              title: item.title,
              author: item.author,
              description: item.description,
              category: "e-kliping",
              mainImage: item.image ? `${STORAGE_BASE_URL}/${item.image}` : "",
              coverImage: item.image ? `${STORAGE_BASE_URL}/${item.image}` : getDefaultImage("e-kliping"),
              content: item.content,
              file_path: item.file_path,
              timestamp: new Date(item.published_at).getTime(),
              createdBy: "Administrator",
            }));
            allItems.push(...ekliping);
          }
        }

        setItems(allItems);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Function untuk mendapatkan gambar default berdasarkan kategori
  const getDefaultImage = (category) => {
    if (category === "e-book") {
      return "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop";
    } else {
      return "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=600&fit=crop";
    }
  };

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

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset ke halaman 1 saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Scroll to top saat ganti halaman
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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

            {/* Pagination info */}
            <div className="text-gray-600 dark:text-gray-400">
              Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredData.length)} dari {filteredData.length} konten
              {filteredData.length !== items.length && ` (${items.length} total)`}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Memuat konten...
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Mengambil data dari server
            </p>
          </div>
        ) : filteredData.length === 0 ? (
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedData.map((item) => (
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
                      e.target.src = getDefaultImage(item.category);
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

                  {/* Publish Date */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(item.timestamp)}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <button
                    onClick={() => handleViewContent(item)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                  >
                    <Eye size={16} />
                    Baca Selengkapnya
                  </button>
                </div>
              </div>
            ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Sebelumnya
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Selanjutnya →
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Main Component
export default function Perpustakaan() {
  return <PerpustakaanPage />;
}
