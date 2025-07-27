import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,
  Download,
  Moon,
  Sun,
  LogOut,
  User,
  Shield,
  Book,
  Newspaper,
  Filter,
  Search,
  Eye,
  BookOpen,
  Clock,
  Calendar,
  Tag,
  ArrowLeft,
  Image as ImageIcon,
  List,
  Type,
  Bold,
  Italic,
  ListOrdered,
  CheckCircle,
  AlertCircle,
  Info,
  XCircle,
} from "lucide-react";

// Import komponen detail
import IsiEbook from "./components/IsiEbook";
import IsiEkliping from "./components/IsiEkliping";

// API Base URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// Custom Notification Component
const Notification = ({ type, message, onClose }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
    error:
      "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
    warning:
      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
  };

  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div
        className={`flex items-center gap-3 p-4 border rounded-lg shadow-lg backdrop-blur-sm ${colors[type]}`}
      >
        <Icon size={20} />
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-70 transition-opacity"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard"); // dashboard, ebook-detail, ekliping-detail
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "e-kliping",
    mainImage: "",
    content: "",
    file: null,
  });

  const categories = [
    { id: "all", name: "Semua", icon: Filter },
    { id: "e-book", name: "E-Book", icon: Book },
    { id: "e-kliping", name: "E-Kliping", icon: Newspaper },
  ];

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const savedUser = localStorage.getItem("currentUser");
      const authToken = localStorage.getItem("token");

      if (!isLoggedIn || isLoggedIn !== "true" || !savedUser || !authToken) {
        // Not authenticated, redirect to login
        navigate("/login");
        return false;
      }

      try {
        const userData = JSON.parse(savedUser);
        setCurrentUser(userData);
        return true;
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
        return false;
      }
    };

    if (checkAuth()) {
      loadItemsFromAPI();
    }
  }, [navigate]);

  // Show notification helper
  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${API_BASE_URL}/v3/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Function to load items from API
  const loadItemsFromAPI = async () => {
    try {
      // Load both e-books and e-kliping with better error handling
      const [ebookResponse, eklipingResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/v1/ebook`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            "Content-Type": "application/json",
          },
        }).catch(err => {
          console.log("E-book endpoint error:", err);
          return { ok: false, status: 500 };
        }),
        fetch(`${API_BASE_URL}/v2/ekliping`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            "Content-Type": "application/json",
          },
        }).catch(err => {
          console.log("E-kliping endpoint error:", err);
          return { ok: false, status: 500 };
        }),
      ]);

      const allItems = [];

      // Process e-books with error handling
      if (ebookResponse.ok) {
        try {
          const ebookResult = await ebookResponse.json();
          if (ebookResult.success && ebookResult.data.data) {
            const ebooks = ebookResult.data.data.map((item) => ({
              id: item.id,
              title: item.title,
              author: item.author,
              description: item.description,
              category: "e-book",
              readTime: `${item.reading_time || 5} menit baca`,
              mainImage: item.image || "",
              content: item.content,
              file_path: item.file_path,
              timestamp: item.published_at,
              published_at: item.published_at, // Tambahan untuk component
              createdBy: "Admin",
            }));
            allItems.push(...ebooks);
          }
        } catch (error) {
          console.error("Error parsing e-book response:", error);
        }
      } else {
        console.log("E-book endpoint failed with status:", ebookResponse.status);
      }

      // Process e-kliping with error handling
      if (eklipingResponse.ok) {
        try {
          const eklipingResult = await eklipingResponse.json();
          if (eklipingResult.success && eklipingResult.data.data) {
            const ekliping = eklipingResult.data.data.map((item) => ({
              id: item.id,
              title: item.title,
              author: item.author,
              description: item.description,
              category: "e-kliping",
              readTime: `${item.reading_time || 5} menit baca`,
              mainImage: item.image || "",
              content: item.content,
              file_path: item.file_path,
              timestamp: item.published_at,
              published_at: item.published_at, // Tambahan untuk component
              createdBy: "Admin",
            }));
            allItems.push(...ekliping);
          }
        } catch (error) {
          console.error("Error parsing e-kliping response:", error);
        }
      } else {
        console.log("E-kliping endpoint failed with status:", eklipingResponse.status);
      }

      // Always set items from API, even if empty
      setItems(allItems);
      
      // Show notification if no endpoints worked
      if (!ebookResponse.ok && !eklipingResponse.ok) {
        showNotification("warning", "Tidak dapat terhubung ke server. Pastikan backend Laravel berjalan!");
      }
      
    } catch (error) {
      console.error("Error loading data from API:", error);
      // Set empty array if API fails
      setItems([]);
      showNotification("error", "Gagal memuat data. Periksa koneksi backend!");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      category: "e-kliping",
      readTime: "",
      mainImage: "",
      content: "",
      file: null,
    });
    setEditingItem(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload for image
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          mainImage: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file upload for document
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  // Text formatting functions
  const insertTextAtCursor = (textarea, textToInsert) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    const newText = before + textToInsert + after;

    setFormData((prev) => ({ ...prev, content: newText }));

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + textToInsert.length,
        start + textToInsert.length
      );
    }, 0);
  };

  const formatText = (format) => {
    const textarea = document.querySelector('textarea[name="content"]');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let formattedText = "";

    switch (format) {
      case "bold":
        formattedText = selectedText ? `**${selectedText}**` : `**teks tebal**`;
        break;
      case "italic":
        formattedText = selectedText ? `*${selectedText}*` : `*teks miring*`;
        break;
      case "bullet":
        formattedText = selectedText ? `• ${selectedText}` : `• `;
        break;
      case "number":
        formattedText = selectedText ? `1. ${selectedText}` : `1. `;
        break;
      case "heading":
        formattedText = selectedText ? `**${selectedText}**` : `**Heading**`;
        break;
      default:
        return;
    }

    insertTextAtCursor(textarea, formattedText);
  };

  // Create new item
  const handleCreate = async () => {
    if (!formData.title.trim() || !formData.author.trim()) {
      showNotification("error", "Judul dan Author harus diisi!");
      return;
    }

    try {
      const endpoint =
        formData.category === "e-book" ? "v1/ebook" : "v2/ekliping";
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("author", formData.author);
      submitData.append("description", formData.description);
      submitData.append("content", formData.content);
      submitData.append(
        "reading_time",
        parseInt(formData.readTime.replace(/\D/g, "")) || 5
      );
      submitData.append("published_at", new Date().toISOString());

      if (formData.mainImage) {
        submitData.append("image", formData.mainImage);
      }
      if (formData.file) {
        submitData.append("file", formData.file);
      }

      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: submitData,
      });

      // Check if response is HTML (error page) instead of JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server mengembalikan halaman error. Pastikan backend Laravel berjalan!");
      }

      const result = await response.json();

      if (response.ok && result.success) {
        await loadItemsFromAPI();
        resetForm();
        setIsModalOpen(false);
        showNotification(
          "success",
          `${
            formData.category === "e-book" ? "E-Book" : "E-Kliping"
          } berhasil ditambahkan!`
        );
      } else {
        showNotification("error", result.message || "Gagal menambahkan item!");
      }
    } catch (error) {
      console.error("Error creating item:", error);
      showNotification("error", `Terjadi kesalahan: ${error.message}`);
    }
  };

  // Update existing item
  const handleUpdate = async () => {
    if (!formData.title.trim() || !formData.author.trim()) {
      showNotification("error", "Judul dan Author harus diisi!");
      return;
    }

    try {
      const endpoint =
        editingItem.type === "e-book" ? "v1/ebook" : "v2/ekliping";
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("author", formData.author);
      submitData.append("description", formData.description);
      submitData.append("content", formData.content);
      submitData.append(
        "reading_time",
        parseInt(formData.readTime.replace(/\D/g, "")) || 5
      );

      if (formData.mainImage) {
        submitData.append("image", formData.mainImage);
      }
      if (formData.file) {
        submitData.append("file", formData.file);
      }

      const response = await fetch(
        `${API_BASE_URL}/${endpoint}/${editingItem.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: submitData,
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        await loadItemsFromAPI();
        resetForm();
        setIsModalOpen(false);
        setEditingItem(null);
        showNotification("success", "Item berhasil diupdate!");
      } else {
        showNotification("error", result.message || "Gagal mengupdate item!");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      showNotification("error", "Terjadi kesalahan saat mengupdate item!");
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      const item = items.find((item) => item.id === id);
      if (!item) return;

      const endpoint = item.category === "e-book" ? "v1/ebook" : "v2/ekliping";
      const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        await loadItemsFromAPI();
        showNotification("success", "Item berhasil dihapus!");
      } else {
        showNotification("error", result.message || "Gagal menghapus item!");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      showNotification("error", "Terjadi kesalahan saat menghapus item!");
    }
  };

  // Open edit modal
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      author: item.author || "",
      description: item.description,
      category: item.type || "e-kliping", // Backend uses 'type', frontend uses 'category'
      readTime: item.reading_time ? `${item.reading_time} menit baca` : "",
      mainImage: item.image || "",
      content: item.content || "",
      file: null,
    });
    setIsModalOpen(true);
  };

  // Navigate to detail view
  const handleViewDetail = (item) => {
    setSelectedItem(item);
    if (item.category === "e-book") {
      setCurrentView("ebook-detail");
    } else {
      setCurrentView("ekliping-detail");
    }
  };

  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedItem(null);
  };

  // Navigate to library (for recommendations)
  const handleNavigateToLibrary = () => {
    setCurrentView("dashboard");
    setActiveCategory("all");
    setSearchQuery("");
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.author &&
        item.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Download file
  const handleDownload = async (item) => {
    if (!item.file_path) {
      showNotification("error", "Tidak ada file untuk diunduh!");
      return;
    }

    try {
      const endpoint = item.category === "e-book" ? "v1/ebook" : "v2/ekliping";
      const response = await fetch(
        `${API_BASE_URL}/${endpoint}/${item.id}/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = item.file_name || `${item.title}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        showNotification("success", "File berhasil diunduh!");
      } else {
        showNotification("error", "Gagal mengunduh file!");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      showNotification("error", "Terjadi kesalahan saat mengunduh file!");
    }
  };

  // Format content for display (convert markdown-like formatting to HTML)
  const formatContentForDisplay = (content) => {
    if (!content) return "Konten belum tersedia.";

    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
      .replace(/^• (.+)$/gm, "<li>$1</li>") // Bullet points
      .replace(/^(\d+)\. (.+)$/gm, "<li>$1. $2</li>") // Numbered lists
      .replace(/\n/g, "<br>"); // Line breaks
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#181A2A]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memuat...</p>
        </div>
      </div>
    );
  }

  // Render detail views
  if (currentView === "ebook-detail" && selectedItem) {
    const enhancedItem = {
      ...selectedItem,
      createdBy: selectedItem.createdBy || "Admin",
      timestamp: selectedItem.timestamp || selectedItem.published_at || new Date().toISOString(),
    };
    
    return (
      <IsiEbook
        item={enhancedItem}
        onBack={handleBackToDashboard}
        onNavigateToLibrary={handleNavigateToLibrary}
        onSelectBook={handleViewDetail}
      />
    );
  }

  if (currentView === "ekliping-detail" && selectedItem) {
    const enhancedItem = {
      ...selectedItem,
      createdBy: selectedItem.createdBy || "Admin",
      timestamp: selectedItem.timestamp || selectedItem.published_at || new Date().toISOString(),
    };
    
    return (
      <IsiEkliping
        item={enhancedItem}
        onBack={handleBackToDashboard}
        onNavigateToLibrary={handleNavigateToLibrary}
        onSelectArticle={handleViewDetail}
      />
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-[#181A2A]">
      {/* Header */}

      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Header */}
      <header className="bg-white dark:bg-[#1F2937] shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Book size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Digital Library Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Kelola konten E-Book dan E-Kliping
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Add Content Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Tambah</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() =>
                  document.documentElement.classList.toggle("dark")
                }
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="dark:hidden">
                  <Moon size={20} />
                </span>
                <span className="hidden dark:inline">
                  <Sun size={20} />
                </span>
              </button>

              {/* User Info */}
              <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  {currentUser.role === "Administrator" ? (
                    <Shield size={14} className="text-white" />
                  ) : (
                    <User size={14} className="text-white" />
                  )}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {currentUser.username}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {currentUser.role}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-[#1F2937] rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                      activeCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon size={16} />
                    {category.name}
                  </button>
                );
              })}
            </div>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari konten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Upload size={32} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchQuery ? "Tidak ada hasil pencarian" : "Belum ada konten"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery
                ? `Coba kata kunci lain untuk pencarian "${searchQuery}"`
                : "Mulai dengan menambahkan konten pertama Anda"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus size={20} />
                Tambah Konten
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1F2937] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="h-48">
                  {item.mainImage ? (
                    <img
                      src={item.mainImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <ImageIcon size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.category === "e-book"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                      }`}
                    >
                      {item.category === "e-book" ? "E-Book" : "E-Kliping"}
                    </span>
                    <div className="flex gap-1">
                      {item.content && (
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded transition-colors"
                          title="Baca Detail"
                        >
                          <Eye size={14} />
                        </button>
                      )}
                      {item.file_path && (
                        <button
                          onClick={() => handleDownload(item)}
                          className="p-1.5 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded transition-colors"
                          title="Unduh File"
                        >
                          <Download size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Apakah Anda yakin ingin menghapus item ini?"
                            )
                          ) {
                            handleDelete(item.id);
                          }
                        }}
                        className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                    {item.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar size={12} />
                    {formatDate(item.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingItem ? "Edit Konten" : "Tambah Konten Baru"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kategori *
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange({
                        target: { name: "category", value: "e-book" },
                      })
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      formData.category === "e-book"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Book size={16} />
                    E-Book
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange({
                        target: { name: "category", value: "e-kliping" },
                      })
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      formData.category === "e-kliping"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Newspaper size={16} />
                    E-Kliping
                  </button>
                </div>
              </div>

              {/* Title & Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Judul *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Masukkan judul"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {formData.category === "e-book" ? "Penulis" : "Sumber"} *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder={
                      formData.category === "e-book"
                        ? "Nama penulis"
                        : "Sumber artikel"
                    }
                  />
                </div>
              </div>

              {/* Reading Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Waktu Baca (menit)
                </label>
                <input
                  type="number"
                  name="readTime"
                  value={formData.readTime.replace(/\D/g, "")}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleInputChange({
                      target: { name: "readTime", value: value ? `${value} menit baca` : "" }
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="5"
                  min="1"
                  max="300"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Estimasi waktu baca dalam menit (1-300 menit)
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  placeholder="Ringkasan singkat konten"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gambar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700"
                />
                {formData.mainImage && (
                  <img
                    src={formData.mainImage}
                    alt="Preview"
                    className="mt-2 w-full h-32 object-cover rounded-lg border"
                  />
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {formData.category === "e-book"
                    ? "Upload File E-Book (PDF, DOC, EPUB, TXT)"
                    : "Upload File E-Kliping (PDF, DOC, TXT)"}
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.epub,.txt"
                  onChange={handleDocumentUpload}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-green-50 file:text-green-700"
                />
                {formData.file && (
                  <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-400">
                      📄 File dipilih: {formData.file.name} (
                      {(formData.file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Maksimal ukuran file: 10MB. Format yang didukung: PDF, DOC,
                  DOCX, EPUB, TXT
                </p>
              </div>

              {/* Content Editor with Rich Text Controls */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {formData.category === "e-book"
                    ? "Isi Buku Lengkap"
                    : "Konten Artikel"}
                </label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  {/* Text Formatting Toolbar */}
                  <div className="bg-gray-50 dark:bg-gray-800 px-3 py-2 border-b border-gray-300 dark:border-gray-600">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mr-3">
                        <Type size={14} />
                        <span>Format:</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => formatText("bold")}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        title="Tebal (Bold)"
                      >
                        <Bold size={12} />
                        <span>Tebal</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => formatText("italic")}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        title="Miring (Italic)"
                      >
                        <Italic size={12} />
                        <span>Miring</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => formatText("heading")}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        title="Heading"
                      >
                        <Type size={12} />
                        <span>Judul</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => formatText("bullet")}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        title="Bullet Points"
                      >
                        <List size={12} />
                        <span>• Bullet</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => formatText("number")}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        title="Numbered List"
                      >
                        <ListOrdered size={12} />
                        <span>1. Angka</span>
                      </button>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Tips: Pilih teks lalu klik tombol format, atau langsung
                      klik untuk menambah format baru
                    </div>
                  </div>

                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={15}
                    className="w-full px-4 py-3 border-0 focus:ring-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none font-mono text-sm"
                    placeholder={
                      formData.category === "e-book"
                        ? `Masukkan isi lengkap buku...

Contoh format:
**Bab 1: Pendahuluan**

Ini adalah paragraf pertama dari bab pertama. Ceritakan dengan detail dan menarik.

Ini paragraf kedua yang melanjutkan cerita.

**Bab 2: Pengembangan**

Fitur-fitur unggulan:
• Point pertama  
• Point kedua
• Point ketiga

Dan seterusnya...`
                        : `Masukkan konten artikel lengkap...

Contoh format:
**Pendahuluan**

Ini adalah paragraf pembuka artikel yang menarik perhatian pembaca.

**Heading Utama**

Konten utama artikel dengan penjelasan detail.

**Fitur-fitur utama:**
• Point pertama
• Point kedua  
• Point ketiga

**Kesimpulan**

Paragraf penutup yang memberikan ringkasan dan call-to-action.`
                    }
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                  <p>
                    <strong>Panduan Format:</strong>
                  </p>
                  <p>
                    • **teks** = <strong>tebal</strong>
                  </p>
                  <p>
                    • *teks* = <em>miring</em>
                  </p>
                  <p>• **Heading** = untuk judul bagian</p>
                  <p>• • teks = bullet point</p>
                  <p>• 1. teks = numbered list</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                onClick={editingItem ? handleUpdate : handleCreate}
                disabled={!formData.title.trim() || !formData.author.trim()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                <Save size={16} />
                {editingItem ? "Update" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setPreviewItem(null)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft size={20} />
                Kembali
              </button>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  previewItem.category === "e-book"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                }`}
              >
                {previewItem.category === "e-book" ? "E-Book" : "E-Kliping"}
              </span>
            </div>

            <article className="p-6">
              <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {previewItem.title}
                </h1>
                <p className="text-blue-600 dark:text-blue-400 mb-4">
                  {previewItem.category === "e-book" ? "oleh" : "dari"}{" "}
                  {previewItem.author}
                </p>
                {previewItem.mainImage && (
                  <img
                    src={previewItem.mainImage}
                    alt={previewItem.title}
                    className="w-full max-h-64 object-cover rounded-lg mb-4"
                  />
                )}
                {previewItem.description && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4">
                    <p className="text-blue-800 dark:text-blue-200">
                      {previewItem.description}
                    </p>
                  </div>
                )}
              </header>
              <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatContentForDisplay(previewItem.content),
                  }}
                />
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
