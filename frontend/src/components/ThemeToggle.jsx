// components/ThemeToggle.jsx
import React from "react";
import { useTheme } from "../components/ThemeSwitch";

export const ThemeToggle = ({
  className = "",
  size = "default",
  showLabel = false,
  variant = "default",
}) => {
  const { isDarkMode, toggleTheme, isLoading } = useTheme();

  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-10 h-10",
    large: "w-12 h-12",
  };

  const iconSizes = {
    small: "16",
    default: "20",
    large: "24",
  };

  const variants = {
    default:
      "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
    primary:
      "bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  if (isLoading) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
      />
    );
  }

  const ButtonComponent = () => (
    <button
      onClick={toggleTheme}
      className={`${sizeClasses[size]} rounded-full ${variants[variant]} flex justify-center items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-yellow-500 transition-transform duration-200 hover:rotate-12"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-700 dark:text-gray-300 transition-transform duration-200 hover:-rotate-12"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );

  if (showLabel) {
    return (
      <div className="flex items-center gap-3">
        <ButtonComponent />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </span>
      </div>
    );
  }

  return <ButtonComponent />;
};

export default ThemeToggle;
