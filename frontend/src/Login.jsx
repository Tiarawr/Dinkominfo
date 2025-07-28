import React, { useState, useEffect } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Moon,
  Sun,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Custom Notification Component
const Notification = ({ type, message, onClose }) => {
  const Icon = type === "success" ? CheckCircle : XCircle;
  const colorClass =
    type === "success"
      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200";

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div
        className={`flex items-center gap-3 p-4 border rounded-lg shadow-lg backdrop-blur-sm ${colorClass}`}
      >
        <Icon size={20} />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentUser = localStorage.getItem("currentUser");
    if (isLoggedIn === "true" && currentUser) {
      navigate("/dashboard");
    }

    // Initialize dark mode from system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setNotification(null);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification(null);

    try {
      const response = await fetch(`${API_BASE_URL}/v3/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const userData = {
          username: result.user.username || loginData.username,
          role: result.user.name || "User",
          loginTime: new Date().toISOString(),
        };

        // Store login state and token
        localStorage.setItem("token", result.token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(userData));

        showNotification(
          "success",
          "Login berhasil! Mengalihkan ke dashboard..."
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        showNotification(
          "error",
          result.message || "Username atau password salah!"
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      showNotification(
        "error",
        "Gagal terhubung ke server. Pastikan backend berjalan!"
      );
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && loginData.username && loginData.password) {
      handleLogin(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-gray-50 dark:bg-[#181A2A] relative">
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm"
        >
          <span className="dark:hidden">
            <Moon size={20} />
          </span>
          <span className="hidden dark:inline">
            <Sun size={20} />
          </span>
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-white/90 dark:bg-[#1F2937]/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-8 text-center border-b border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-xl flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Selamat Datang
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Masuk ke Digital Library Dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="p-8 space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={loginData.username}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 placeholder-gray-400"
                    placeholder="Masukkan username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 placeholder-gray-400"
                    placeholder="Masukkan password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={
                  isLoading || !loginData.username || !loginData.password
                }
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <User size={18} />
                    <span>Masuk ke Dashboard</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Digital Library Management System
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
