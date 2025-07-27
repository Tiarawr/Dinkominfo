import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,
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
  Lock,
  UserCheck,
} from "lucide-react";

// Login Component
function LoginPage({ onLogin, isDarkMode, setIsDarkMode }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Demo credentials
  const validCredentials = [
    { username: "admin", password: "admin123", role: "Administrator" },
    { username: "user", password: "user123", role: "User" },
    { username: "editor", password: "editor123", role: "Editor" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      const user = validCredentials.find(
        (cred) =>
          cred.username === loginData.username &&
          cred.password === loginData.password
      );

      if (user) {
        const userData = {
          username: user.username,
          role: user.role,
          loginTime: new Date().toISOString(),
        };

        // Save to localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(userData));

        onLogin(userData);
      } else {
        alert("Username atau password salah!");
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? "dark bg-[#181A2A]" : "bg-gray-50"
      }`}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="bg-white dark:bg-[#1F2937] p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Digital Library Login
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Masuk untuk mengakses dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              <>
                <UserCheck size={20} />
                Masuk
              </>
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Demo Credentials:
          </h3>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>
              <strong>Admin:</strong> admin / admin123
            </p>
            <p>
              <strong>User:</strong> user / user123
            </p>
            <p>
              <strong>Editor:</strong> editor / editor123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component
function Dashboard({ currentUser, onLogout, isDarkMode, setIsDarkMode }) {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewItem, setPreviewItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "e-kliping",
    mainImage: "",
    content: "",
  });

  const categories = [
    { id: "all", name: "Semua", icon: Filter },
    { id: "e-book", name: "E-Book", icon: Book },
    { id: "e-kliping", name: "E-Kliping", icon: Newspaper },
  ];

  // Load saved data on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem("dashboardItems");

    if (savedItems && savedItems !== "[]") {
      setItems(JSON.parse(savedItems));
    } else {
      // Only set sample data if no items exist
      const sampleData = [
        {
          id: 1,
          title:
            "Inovasi Digital Pemerintah Kabupaten Pekalongan dalam Pelayanan Publik",
          author: "Tim Redaksi Diskominfo",
          description:
            "Kabupaten Pekalongan terus berkomitmen untuk memberikan pelayanan publik yang terbaik bagi masyarakat melalui berbagai inovasi teknologi digital.",
          category: "e-kliping",
          mainImage:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          content: `**Portal Digital Terintegrasi**

Salah satu terobosan terbesar adalah pengembangan portal digital terintegrasi yang memungkinkan masyarakat mengakses berbagai layanan administrasi secara online. Portal ini mencakup layanan perizinan, informasi publik, dan berbagai dokumen penting lainnya.

**Aplikasi Mobile untuk Kemudahan Akses**

Tidak hanya melalui website, Pemerintah Kabupaten Pekalongan juga mengembangkan aplikasi mobile yang dapat diunduh melalui smartphone. Aplikasi ini memungkinkan masyarakat untuk mengakses layanan kapan saja dan di mana saja.

**Fitur-fitur unggulan:**
• Pengajuan surat keterangan online
• Informasi pembangunan terkini  
• Laporan keluhan masyarakat
• Jadwal kegiatan pemerintahan
• Akses dokumen publik

**Dampak Positif bagi Masyarakat**

Implementasi teknologi digital dalam pelayanan publik telah memberikan dampak positif yang signifikan. Waktu pengurusan dokumen yang sebelumnya memakan waktu berhari-hari, kini dapat diselesaikan dalam hitungan jam.`,
          timestamp: "2025-01-15T10:00:00Z",
          createdBy: "Admin",
        },
      ];
      setItems(sampleData);
      localStorage.setItem("dashboardItems", JSON.stringify(sampleData));
    }
  }, []);

  // Save items when items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("dashboardItems", JSON.stringify(items));
    }
  }, [items]);

  // Handle logout
  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      setIsModalOpen(false);
      setEditingItem(null);
      resetForm();

      // Clear localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");

      onLogout();
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
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
  const handleCreate = () => {
    if (!formData.title.trim() || !formData.author.trim()) {
      alert("Judul dan Author harus diisi!");
      return;
    }

    const newItem = {
      id: Date.now(),
      title: formData.title,
      author: formData.author,
      description: formData.description,
      category: formData.category,
      mainImage: formData.mainImage,
      content: formData.content,
      timestamp: new Date().toISOString(),
      createdBy: currentUser.username,
    };

    setItems((prev) => [...prev, newItem]);
    resetForm();
    setIsModalOpen(false);
    alert(
      `${
        formData.category === "e-book" ? "E-Book" : "E-Kliping"
      } berhasil ditambahkan!`
    );
  };

  // Update existing item
  const handleUpdate = () => {
    if (!formData.title.trim() || !formData.author.trim()) {
      alert("Judul dan Author harus diisi!");
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              title: formData.title,
              author: formData.author,
              description: formData.description,
              category: formData.category,
              mainImage: formData.mainImage,
              content: formData.content,
              timestamp: new Date().toISOString(),
              updatedBy: currentUser.username,
            }
          : item
      )
    );
    resetForm();
    setIsModalOpen(false);
    setEditingItem(null);
    alert("Item berhasil diupdate!");
  };

  // Delete item
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus item ini?"
    );
    if (confirmDelete) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      alert("Item berhasil dihapus!");
    }
  };

  // Open edit modal
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      author: item.author || "",
      description: item.description,
      category: item.category || "e-kliping",
      mainImage: item.mainImage || "",
      content: item.content || "",
    });
    setIsModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      category: "e-kliping",
      mainImage: "",
      content: "",
    });
    setEditingItem(null);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setPreviewItem(null);
    resetForm();
  };

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get login duration
  const getLoginDuration = () => {
    if (!currentUser?.loginTime) return "";
    const loginTime = new Date(currentUser.loginTime);
    const now = new Date();
    const diffMinutes = Math.floor((now - loginTime) / (1000 * 60));

    if (diffMinutes < 1) return "Baru saja";
    if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours} jam yang lalu`;
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.author &&
        item.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get category stats
  const getCategoryStats = () => {
    const stats = {
      total: items.length,
      "e-book": items.filter((item) => item.category === "e-book").length,
      "e-kliping": items.filter((item) => item.category === "e-kliping").length,
    };
    return stats;
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

  const stats = getCategoryStats();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "dark bg-[#181A2A]" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      <div className="bg-white dark:bg-[#1F2937] shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Digital Library Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Kelola konten E-Book dan E-Kliping Anda
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* User Info */}
              <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {currentUser?.username}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {currentUser?.role} • Login {getLoginDuration()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <Plus size={20} />
                Tambah Konten
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Upload
                  size={24}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Konten
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Book
                  size={24}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  E-Books
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats["e-book"]}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Newspaper
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  E-Klipings
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats["e-kliping"]}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Shield
                  size={24}
                  className="text-orange-600 dark:text-orange-400"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Status
                </p>
                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
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
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari judul, author, atau konten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              {selectedCategory === "all" ? (
                <Upload
                  size={32}
                  className="text-gray-400 dark:text-gray-500"
                />
              ) : selectedCategory === "e-book" ? (
                <Book size={32} className="text-gray-400 dark:text-gray-500" />
              ) : (
                <Newspaper
                  size={32}
                  className="text-gray-400 dark:text-gray-500"
                />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchQuery
                ? "Tidak ada hasil pencarian"
                : `Belum ada ${
                    selectedCategory === "all" ? "konten" : selectedCategory
                  }`}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery
                ? `Coba kata kunci lain untuk pencarian "${searchQuery}"`
                : `Mulai dengan menambahkan ${
                    selectedCategory === "all" ? "konten" : selectedCategory
                  } pertama Anda`}
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
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="md:flex">
                  {/* Image */}
                  <div className="md:w-80 h-48 md:h-auto">
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
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 mb-2">
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

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        {item.content && (
                          <button
                            onClick={() => setPreviewItem(item)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                          >
                            <Eye size={14} />
                            Baca
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <Trash2 size={14} />
                          Hapus
                        </button>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.title}
                    </h2>

                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {item.category === "e-book" ? "oleh" : "dari"}{" "}
                      {item.author}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(item.timestamp)}
                      </span>
                      <span>•</span>
                      <span>Oleh {item.createdBy}</span>
                      {item.updatedBy && (
                        <>
                          <span>•</span>
                          <span>Diupdate oleh {item.updatedBy}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingItem ? "Edit Konten" : "Tambah Konten Baru"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Kategori Konten *
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange({
                        target: { name: "category", value: "e-book" },
                      })
                    }
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                      formData.category === "e-book"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Book size={18} />
                    <div className="text-left">
                      <div className="font-medium">E-Book</div>
                      <div className="text-xs opacity-75">
                        Buku digital lengkap
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange({
                        target: { name: "category", value: "e-kliping" },
                      })
                    }
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                      formData.category === "e-kliping"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Newspaper size={18} />
                    <div className="text-left">
                      <div className="font-medium">E-Kliping</div>
                      <div className="text-xs opacity-75">Artikel & berita</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Title & Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Judul {formData.category === "e-book" ? "Buku" : "Artikel"}{" "}
                    *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder={
                      formData.category === "e-book"
                        ? "Masukkan judul buku"
                        : "Masukkan judul artikel"
                    }
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
                        ? "Nama penulis buku"
                        : "Sumber artikel (media/website)"
                    }
                  />
                </div>
              </div>

              {/* Read Time & Description */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {formData.category === "e-book"
                      ? "Sinopsis"
                      : "Deskripsi/Ringkasan"}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    placeholder={
                      formData.category === "e-book"
                        ? "Ringkasan cerita atau isi buku"
                        : "Ringkasan singkat isi artikel"
                    }
                  />
                </div>
              </div>

              {/* Main Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {formData.category === "e-book"
                    ? "Cover Buku"
                    : "Gambar Utama"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.mainImage && (
                  <div className="mt-3">
                    <img
                      src={formData.mainImage}
                      alt="Preview"
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                  </div>
                )}
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

            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={closeModal}
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
                {editingItem ? "Update Konten" : "Simpan Konten"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setPreviewItem(null)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft size={20} />
                Kembali
              </button>
              <div className="flex items-center gap-2">
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
            </div>

            {/* Article Content */}
            <article className="p-6">
              {/* Article Header */}
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {previewItem.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {previewItem.category === "e-book" ? "oleh" : "dari"}{" "}
                    {previewItem.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(previewItem.timestamp)}
                  </span>
                </div>

                {/* Main Image */}
                {previewItem.mainImage && (
                  <div className="mb-8">
                    <img
                      src={previewItem.mainImage}
                      alt={previewItem.title}
                      className="w-full max-h-96 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                )}

                {/* Description/Synopsis */}
                {previewItem.description && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-8">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      {previewItem.category === "e-book"
                        ? "Sinopsis"
                        : "Ringkasan"}
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                      {previewItem.description}
                    </p>
                  </div>
                )}
              </header>

              {/* Article Body with Rich Text Formatting */}
              <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                <div
                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: formatContentForDisplay(previewItem.content),
                  }}
                />
              </div>

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Informasi{" "}
                    {previewItem.category === "e-book" ? "Buku" : "Artikel"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <p>
                        <strong>Dipublikasikan:</strong>{" "}
                        {formatDate(previewItem.timestamp)}
                      </p>
                      <p>
                        <strong>Ditambahkan oleh:</strong>{" "}
                        {previewItem.createdBy}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Kategori:</strong>{" "}
                        {previewItem.category === "e-book"
                          ? "E-Book"
                          : "E-Kliping"}
                      </p>
                      {previewItem.updatedBy && (
                        <p>
                          <strong>Terakhir diupdate oleh:</strong>{" "}
                          {previewItem.updatedBy}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </footer>
            </article>
          </div>
        </div>
      )}
    </div>
  );
}

// Main App Component with Authentication
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check authentication on app load
  useEffect(() => {
    const savedLoggedIn = localStorage.getItem("isLoggedIn");
    const savedUser = localStorage.getItem("currentUser");
    const savedDarkMode = localStorage.getItem("isDarkMode");

    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }

    if (savedLoggedIn === "true" && savedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={handleLogin}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    );
  }

  return (
    <Dashboard
      currentUser={currentUser}
      onLogout={handleLogout}
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
    />
  );
}
