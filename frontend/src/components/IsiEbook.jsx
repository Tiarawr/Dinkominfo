import React, { useState, useEffect } from "react";
import {
  Book,
  Calendar,
  Clock,
  User,
  Download,
  Share2,
  ArrowLeft,
  Eye,
} from "lucide-react";

import ThemeSwitch from "../components/ThemeSwitch";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "./Footer";

// API Base URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export default function IsiEbook({
  item,
  onBack,
  onNavigateToLibrary,
  onSelectBook,
  isDarkMode,
}) {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recommended books from backend
  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8000/api/v1/ebook`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Ambil 3 e-book terbaru dan exclude item yang sedang dibaca
          const ebooks = data.data.data
            ?.filter(book => book.id !== item?.id)
            .slice(0, 3) || [];
          
          setRecommendedBooks(ebooks);
        }
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedBooks();
  }, [item?.id]);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatContentForDisplay = (content) => {
    if (!content) return "Konten E-Book belum tersedia.";

    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^• (.+)$/gm, "<li>$1</li>")
      .replace(/^(\d+)\. (.+)$/gm, "<li>$1. $2</li>")
      .replace(/\n/g, "<br>");
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/ebooks/${item.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link E-Book berhasil disalin ke clipboard!");
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Silakan login terlebih dahulu');
        return;
      }

      // Jika ada file_path, download file asli dari backend
      if (item.file_path) {
        const response = await fetch(`http://localhost:8000/api/v1/ebook/${item.id}/download`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Buat blob dan download
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          
          // Ambil nama file dari header response atau gunakan default
          const contentDisposition = response.headers.get('content-disposition');
          let filename = `${item.title.replace(/[^a-z0-9]/gi, "_")}_ebook`;
          
          if (contentDisposition) {
            const match = contentDisposition.match(/filename="(.+)"/);
            if (match) {
              filename = match[1];
            }
          }
          
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        } else {
          throw new Error('Gagal mengunduh file');
        }
      } else {
        // Fallback ke HTML download jika tidak ada file
        const printContent = `
          <html>
            <head>
              <title>${item.title}</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; background-color: #fff; }
                h1 { color: #2563eb; margin-bottom: 10px; }
                .meta { color: #666; margin-bottom: 20px; font-size: 14px; }
                .content { margin-top: 30px; }
                .content p { margin-bottom: 15px; }
                strong { font-weight: bold; }
                li { margin-bottom: 5px; }
              </style>
            </head>
            <body>
              <h1>${item.title}</h1>
              <div class="meta">
                <p><strong>Penulis:</strong> ${item.author}</p>
                <p><strong>Dipublikasikan:</strong> ${formatDate(
                  item.published_at || item.timestamp
                )}</p>
                <p><strong>Estimasi Waktu Baca:</strong> ${
                  item.readTime || "Tidak tersedia"
                }</p>
              </div>
              <div class="content">
                ${formatContentForDisplay(item.content)}
              </div>
            </body>
          </html>
        `;

        const blob = new Blob([printContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${item.title.replace(/[^a-z0-9]/gi, "_")}.html`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Gagal mengunduh file');
    }
  };

  const handleReadRecommendation = (book) => {
    if (onSelectBook) {
      // Menggunakan data asli dari backend tanpa modifikasi dummy
      onSelectBook(book);
    }
  };

  const handleViewAllBooks = () => {
    if (onNavigateToLibrary) {
      onNavigateToLibrary();
    }
  };

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 dark:bg-[#181A2A] bg-white">
      {/* Navigation Header */}
      <div className="bg-white dark:bg-[#1F2937] shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
              Kembali ke Dashboard
            </button>

            <ThemeToggle
              className="ml-4"
              size="default"
              variant="default"
              showLabel={false}
            />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* E-Book Content - Main Column */}
          <div className="lg:col-span-3">
            <article className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* E-Book Header */}
              <header className="p-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Book
                    className="text-green-600 dark:text-green-400"
                    size={24}
                  />
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    E-Book Digital
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {item.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <User size={14} className="text-white" />
                    </div>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      oleh{" "}
                      {item.author ||
                        item.created_by ||
                        "Penulis Tidak Diketahui"}
                    </span>
                  </div>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {item.created_at
                      ? formatDate(item.created_at)
                      : "Tanggal tidak tersedia"}
                  </span>
                  {(item.readTime || item.content) && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {item.readTime ||
                          `${Math.ceil(
                            (item.content?.length || 1000) / 200
                          )} menit`}
                      </span>
                    </>
                  )}
                </div>

                {/* Book Cover */}
                <div className="mb-6">
                  <img
                    src={
                      item.image_url ||
                      item.mainImage ||
                      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop"
                    }
                    alt={item.title}
                    className="w-full max-h-96 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop";
                    }}
                  />
                </div>

                {/* Synopsis */}
                {item.description && (
                  <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                      <Book size={16} />
                      Sinopsis Buku
                    </h3>
                    <p className="text-green-800 dark:text-green-200 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </header>

              {/* E-Book Content */}
              <div className="p-8">
                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      📖 Mulai Membaca
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      Anda sedang membaca E-Book digital. Gunakan scroll untuk
                      melanjutkan membaca atau tombol navigasi di atas untuk
                      berbagi dan mengunduh.
                    </p>
                  </div>

                  <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify space-y-4"
                    style={{ lineHeight: "1.8" }}
                    dangerouslySetInnerHTML={{
                      __html: formatContentForDisplay(item.content),
                    }}
                  />
                </div>
              </div>

              {/* E-Book Footer */}
              <footer className="p-8 border-t border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Book size={16} />
                      Informasi Buku
                    </h4>
                    <div className="space-y-1">
                      <p>
                        <strong>Judul:</strong> {item.title}
                      </p>
                      <p>
                        <strong>Penulis:</strong>{" "}
                        {item.author ||
                          item.created_by ||
                          "Penulis Tidak Diketahui"}
                      </p>
                      <p>
                        <strong>Dipublikasikan:</strong>{" "}
                        {item.created_at
                          ? formatDate(item.created_at)
                          : "Tanggal tidak tersedia"}
                      </p>
                      <p>
                        <strong>Ditambahkan oleh:</strong>{" "}
                        {item.created_by || "Administrator"}
                      </p>
                      {item.updatedBy && (
                        <p>
                          <strong>Terakhir diupdate oleh:</strong>{" "}
                          {item.updatedBy}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      📚 Detail Bacaan
                    </h4>
                    <div className="space-y-1">
                      <p>
                        <strong>Kategori:</strong> E-Book Digital
                      </p>
                      {item.readTime && (
                        <p>
                          <strong>Estimasi Waktu Baca:</strong> {item.readTime}
                        </p>
                      )}
                      <p>
                        <strong>Format:</strong> Digital HTML/PDF
                      </p>
                      <p>
                        <strong>Status:</strong> Tersedia Online
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Share2 size={16} />
                    Bagikan Buku
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Download size={16} />
                    Unduh E-Book
                  </button>
                </div>
              </footer>
            </article>
          </div>

          {/* Sidebar - Recommendations */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-32">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Book size={18} />
                Rekomendasi E-Book
              </h3>

              <div className="space-y-6">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Memuat rekomendasi...
                    </p>
                  </div>
                ) : recommendedBooks.length > 0 ? (
                  recommendedBooks.map((book) => (
                    <div
                      key={book.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0"
                    >
                      {/* Book Cover */}
                      <div className="mb-3">
                        <img
                          src={
                            book.image_url ||
                            book.mainImage ||
                            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
                          }
                          alt={book.title}
                          className="w-full h-32 object-cover rounded-lg shadow-sm"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop";
                          }}
                        />
                      </div>

                      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">
                        {book.title}
                      </h4>
                      <p className="text-xs text-green-600 dark:text-green-400 mb-1">
                        oleh{" "}
                        {book.author ||
                          book.created_by ||
                          "Penulis Tidak Diketahui"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                        {book.description || "Deskripsi tidak tersedia"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock size={10} />
                          {book.readTime || `${book.reading_time || 5} menit baca`}
                        </span>
                        <button
                          onClick={() => handleReadRecommendation(book)}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 rounded transition-colors"
                        >
                          <Eye size={12} />
                          Baca
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Tidak ada rekomendasi e-book tersedia.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleViewAllBooks}
                className="w-full mt-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Lebih Banyak E-Book
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
