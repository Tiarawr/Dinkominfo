import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useNavigate, Link } from "react-router-dom";
import { Calendar } from "lucide-react";

// Blob component
const Blob = ({ className, style }) => (
  <div
    className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob ${className}`}
    style={style}
  />
);

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getDefaultImage = (category) => {
  return category === "e-book"
    ? "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
};

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestArticles();
  }, []);

  const fetchLatestArticles = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/articles/latest`
      );
      const data = await response.json();

      if (data.success) {
        setArticles(data.data);
      } else {
        console.error("Failed to fetch articles:", data.message);
        setArticles([]);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (article) => {
    navigate(article.link);
  };
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
          <Link
            className="btn btn-primary border-0 bg-[#b83e3e] text-white hover:text-white hover:bg-[#922e2e] text-lg font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            to="/perpustakaan"
          >
            Lihat Publikasi
          </Link>
        </div>
      </div>

      {/* Publications Section */}
      <div className="px-8 py-16 mb-8">
        <h1 className="text-4xl text-black dark:text-white font-semibold text-center mb-12">
          Publikasi Unggulan
        </h1>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Memuat artikel terbaru...
            </h3>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Belum ada artikel
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Artikel sedang dalam proses pengembangan
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => handleArticleClick(item)}
              >
                <div className="relative">
                  <img
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    src={item.image || getDefaultImage(item.type)}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = getDefaultImage(item.type);
                    }}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.type === "e-book"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                      }`}
                    >
                      {item.type === "e-book" ? "E-Book" : "E-Kliping"}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {item.type === "e-book" ? "oleh" : "dari"} {item.author}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Publish Date */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar size={12} />
                    <span>{formatDate(item.published_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
