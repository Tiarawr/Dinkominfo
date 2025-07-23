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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photo: "",
  });

  const navigate = useNavigate();

  // Check authentication & load items from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn && storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(storedUser));
      const savedItems = localStorage.getItem("dashboardItems");
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
      navigate("/login");
    }
  }, []); // <-- hanya dijalankan sekali saat mount

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("dashboardItems", JSON.stringify(items));
  }, [items]);

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setItems([]);
    setIsModalOpen(false);
    setEditingItem(null);
    resetForm();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
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
          photo: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Create new item
  const handleCreate = () => {
    if (!formData.title.trim()) return;

    const newItem = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      photo: formData.photo,
      timestamp: new Date().toISOString(),
      createdBy: currentUser.username,
    };

    setItems((prev) => [...prev, newItem]);
    resetForm();
    setIsModalOpen(false);
  };

  // Update existing item
  const handleUpdate = () => {
    if (!formData.title.trim()) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              title: formData.title,
              description: formData.description,
              photo: formData.photo,
              timestamp: new Date().toISOString(),
              updatedBy: currentUser.username,
            }
          : item
      )
    );
    resetForm();
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Delete item
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus item ini?"
    );
    if (confirmDelete) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Open edit modal
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      photo: item.photo,
    });
    setIsModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      photo: "",
    });
    setEditingItem(null);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  // Dashboard UI
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
                Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Selamat datang,{" "}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {currentUser?.username}
                </span>{" "}
                • {currentUser?.role}
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
                    Login {getLoginDuration()}
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
                Tambah Item
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  Total Items
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {items.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <User
                  size={24}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  User Role
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {currentUser?.role}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Shield
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Upload size={32} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Belum ada item
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Mulai dengan menambahkan item pertama Anda
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus size={20} />
              Tambah Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
              >
                {item.photo && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 space-y-1">
                    <p>{formatDate(item.timestamp)}</p>
                    <p>Dibuat oleh: {item.createdBy}</p>
                    {item.updatedBy && <p>Diupdate oleh: {item.updatedBy}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 size={14} />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingItem ? "Edit Item" : "Tambah Item Baru"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
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
                  placeholder="Masukkan judul item"
                />
              </div>

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
                  placeholder="Masukkan deskripsi item (opsional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Foto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.photo && (
                  <div className="mt-2">
                    <img
                      src={formData.photo}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
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
                disabled={!formData.title.trim()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                <Save size={16} />
                {editingItem ? "Update" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
