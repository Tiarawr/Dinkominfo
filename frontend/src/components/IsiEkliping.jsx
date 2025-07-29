import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Newspaper,
  Calendar,
  Clock,
  User,
  Download,
  Share2,
  ExternalLink,
  ArrowLeft,
  Eye,
} from "lucide-react";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";

// API Base URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
const STORAGE_BASE_URL =
  import.meta.env.VITE_STORAGE_BASE_URL || "http://localhost:8000/storage";

export default function IsiEkliping() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch individual ekliping by ID
  useEffect(() => {
    const fetchEkliping = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/v2/ekliping`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const ekliping = data.data.data?.find((article) => article.id === parseInt(id));
          if (ekliping) {
            setItem(ekliping);
            // Scroll to top when content loads
            window.scrollTo(0, 0);
          } else {
            navigate('/perpustakaan');
          }
        }
      } catch (error) {
        console.error("Error fetching ekliping:", error);
        navigate('/perpustakaan');
      }
    };

    if (id) {
      fetchEkliping();
    }
  }, [id, navigate]);

  // Fetch recommended articles from backend
  useEffect(() => {
    const fetchRecommendedArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/v2/ekliping`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Ambil 3 e-kliping terbaru dan exclude item yang sedang dibaca
          const eklipings =
            data.data.data
              ?.filter((article) => article.id !== item?.id)
              .slice(0, 3) || [];

          setRecommendedArticles(eklipings);
        }
      } catch (error) {
        console.error("Error fetching recommended articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedArticles();
  }, [item?.id]);

  // Handler functions
  const handleBack = () => {
    navigate('/perpustakaan');
  };

  const handleNavigateToLibrary = () => {
    navigate('/perpustakaan');
  };

  const handleReadRecommendation = (article) => {
    navigate(`/ekliping/${article.id}`);
  };

  const handleViewAllArticles = () => {
    navigate('/perpustakaan');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Memuat e-kliping...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">E-kliping tidak ditemukan</p>
          <button 
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali ke Perpustakaan
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatContentForDisplay = (content) => {
    if (!content) return "Konten E-Kliping belum tersedia.";
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^• (.+)$/gm, "<li>$1</li>")
      .replace(/^(\d+)\. (.+)$/gm, "<li>$1. $2</li>")
      .replace(/\n/g, "<br>");
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/ekliping/${item.id}`;
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
      alert("Link artikel berhasil disalin ke clipboard!");
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Silakan login terlebih dahulu");
        return;
      }

      // Jika ada file_path, download file asli dari backend
      if (item.file_path) {
        const response = await fetch(
          `${API_BASE_URL}/v2/ekliping/${item.id}/download`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          // Buat blob dan download
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;

          // Ambil nama file dari header response atau gunakan default
          const contentDisposition = response.headers.get(
            "content-disposition"
          );
          let filename = `${item.title.replace(/[^a-z0-9]/gi, "_")}_kliping`;

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
          throw new Error("Gagal mengunduh file");
        }
      } else {
        // Fallback ke HTML download jika tidak ada file
        const printContent = `
          <html>
            <head>
              <title>${item.title}</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
                h1 { color: #7c3aed; margin-bottom: 10px; }
                .meta { color: #666; margin-bottom: 20px; font-size: 14px; }
                .content { margin-top: 30px; }
                .content p { margin-bottom: 15px; }
                strong { font-weight: bold; }
                li { margin-bottom: 5px; }
                .source { margin-top: 30px; padding: 15px; background: #f3f4f6; border-left: 4px solid #7c3aed; }
              </style>
            </head>
            <body>
              <h1>${item.title}</h1>
              <div class="meta">
                <p><strong>Sumber:</strong> ${item.author}</p>
                <p><strong>Tanggal:</strong> ${formatDate(
                  item.published_at
                )}</p>
              </div>
              <div class="content">
                ${formatContentForDisplay(item.content)}
              </div>
              ${
                item.sourceUrl
                  ? `<div class="source"><strong>Sumber Asli:</strong> ${item.sourceUrl}</div>`
                  : ""
              }
            </body>
          </html>
        `;
        const blob = new Blob([printContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${item.title.replace(/[^a-z0-9]/gi, "_")}_kliping.html`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Gagal mengunduh file");
    }
  };

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-white dark:bg-[#0f172a]">
      {/* Header Navigasi */}
      <div className="bg-white dark:bg-[#1F2937] shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
              Kembali ke Perpustakaan
            </button>

            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <article className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <header className="p-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Newspaper
                    className="text-purple-600 dark:text-purple-400"
                    size={24}
                  />
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                    E-Kliping Berita
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {item.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <User size={14} className="text-white" />
                    </div>
                    <span className="font-medium text-purple-600 dark:text-purple-400">
                      dari{" "}
                      {item.author ||
                        item.created_by ||
                        "Sumber Tidak Diketahui"}
                    </span>
                  </div>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {item.published_at
                      ? formatDate(item.published_at)
                      : "Tanggal tidak tersedia"}
                  </span>
                </div>

                {item.mainImage && (
                  <div className="mb-6">
                    <img
                      src={item.mainImage}
                      alt={item.title}
                      className="w-full max-h-96 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                )}

                {item.description && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r-lg">
                    <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2 flex items-center gap-2">
                      <Newspaper size={16} />
                      Ringkasan Artikel
                    </h3>
                    <p className="text-purple-800 dark:text-purple-200 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </header>

              <div className="p-8">
                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                  <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                      📰 Artikel Terkliping
                    </h3>
                    <p className="text-amber-800 dark:text-amber-200 text-sm">
                      Artikel ini telah dikliping dan disimpan dalam koleksi
                      digital perpustakaan untuk referensi dan dokumentasi.
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

              <footer className="p-8 border-t border-gray-200 dark:border-gray-700 bg-purple-50 dark:bg-purple-800/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Newspaper size={16} />
                      Informasi Artikel
                    </h4>
                    <div className="space-y-1">
                      <p>
                        <strong>Judul:</strong> {item.title}
                      </p>
                      <p>
                        <strong>Sumber:</strong>{" "}
                        {item.author ||
                          item.created_by ||
                          "Sumber Tidak Diketahui"}
                      </p>
                      <p>
                        <strong>Tanggal Terbit:</strong>{" "}
                        {item.published_at
                          ? formatDate(item.published_at)
                          : "Tanggal tidak tersedia"}
                      </p>
                      <p>
                        <strong>Dikliping oleh:</strong>{" "}
                        {item.created_by || "Administrator"}
                      </p>
                      {item.updated_at && (
                        <p>
                          <strong>Terakhir diupdate:</strong>{" "}
                          {formatDate(item.updated_at)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      📋 Detail Kliping
                    </h4>
                    <div className="space-y-1">
                      <p>
                        <strong>Kategori:</strong> E-Kliping Digital
                      </p>
                      {item.readTime && (
                        <p>
                          <strong>Estimasi Waktu Baca:</strong> {item.readTime}
                        </p>
                      )}
                      <p>
                        <strong>Format:</strong> Artikel Digital
                      </p>
                      <p>
                        <strong>Status:</strong> Tersimpan dalam Koleksi
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <Share2 size={16} />
                    Bagikan Artikel
                  </button>
                  {item.file_path && (
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <Download size={16} />
                      Unduh Kliping
                    </button>
                  )}
                  {item.sourceUrl && (
                    <button
                      onClick={() => window.open(item.sourceUrl, "_blank")}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink size={16} />
                      Sumber Asli
                    </button>
                  )}
                </div>
              </footer>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-32">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Newspaper size={18} />
                Saran E-Kliping
              </h3>

              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Memuat saran e-kliping...
                    </p>
                  </div>
                ) : recommendedArticles.length > 0 ? (
                  recommendedArticles.map((article) => (
                    <div
                      key={article.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex gap-3">
                        {/* Gambar artikel */}
                        {article.image && (
                          <div className="flex-shrink-0">
                            <img
                              src={`${STORAGE_BASE_URL}/${article.image}`}
                              alt={article.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">
                            dari{" "}
                            {article.author ||
                              article.created_by ||
                              "Sumber Tidak Diketahui"}
                          </p>
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => handleReadRecommendation(article)}
                              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                            >
                              <Eye size={12} />
                              Baca
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Tidak ada saran e-kliping tersedia.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full mt-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Lebih Banyak E-Kliping
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
