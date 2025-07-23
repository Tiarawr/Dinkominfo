import React, { useState, useEffect } from "react";
import { User, Lock, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Tambahkan ini

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentUser = localStorage.getItem("currentUser");
    if (isLoggedIn === "true" && currentUser) {
      navigate("/dashboard"); // Redirect ke dashboard
    }
  }, [navigate]);

  // Predefined users (in real app, this would be from backend)
  const validUsers = [
    { username: "admin", password: "admin123", role: "Administrator" },
    { username: "user", password: "user123", role: "User" },
    { username: "demo", password: "demo123", role: "Demo User" },
    { username: "tiara", password: "tiara123", role: "User" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLoginError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const user = validUsers.find(
      (u) =>
        u.username === loginData.username && u.password === loginData.password
    );

    if (user) {
      // Store login state in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          username: user.username,
          role: user.role,
          loginTime: new Date().toISOString(),
        })
      );

      // Redirect ke dashboard
      navigate("/dashboard");
    } else {
      setLoginError("Username atau password salah!");
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && loginData.username && loginData.password) {
      handleLogin(e);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-[#181A2A]"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Login Card */}
        <div className="bg-white/80 dark:bg-[#1F2937]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-8 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Selamat Datang
              </h2>
              <p className="text-blue-100 text-sm">Masuk ke dashboard Anda</p>
            </div>
          </div>

          {/* Login Form */}
          <div className="p-8 pt-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User
                      size={18}
                      className="text-gray-400 group-focus-within:text-blue-500 transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={loginData.username}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 placeholder-gray-400"
                    placeholder="Masukkan username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock
                      size={18}
                      className="text-gray-400 group-focus-within:text-blue-500 transition-colors"
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    className="w-full pl-12 pr-12 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 placeholder-gray-400"
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-shake">
                <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
                  {loginError}
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading || !loginData.username || !loginData.password}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
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

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Demo aplikasi dashboard dengan sistem login
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
