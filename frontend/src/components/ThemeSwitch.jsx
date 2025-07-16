// contexts/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeTheme = () => {
      try {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

        const shouldUseDark =
          savedTheme === "dark" || (!savedTheme && prefersDark);

        setIsDarkMode(shouldUseDark);
        applyTheme(shouldUseDark);
      } catch (error) {
        console.warn("Failed to initialize theme:", error);
        // Fallback to light mode
        setIsDarkMode(false);
        applyTheme(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => {
      const savedTheme = localStorage.getItem("theme");
      // Only update if user hasn't set a manual preference
      if (!savedTheme) {
        setIsDarkMode(e.matches);
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const applyTheme = (dark) => {
    try {
      const root = document.documentElement;

      if (dark) {
        root.classList.add("dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.style.colorScheme = "light";
      }
    } catch (error) {
      console.warn("Failed to apply theme:", error);
    }
  };

  const toggleTheme = () => {
    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      applyTheme(newDarkMode);
      localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    } catch (error) {
      console.warn("Failed to toggle theme:", error);
    }
  };

  const setTheme = (dark) => {
    try {
      setIsDarkMode(dark);
      applyTheme(dark);
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (error) {
      console.warn("Failed to set theme:", error);
    }
  };

  const resetTheme = () => {
    try {
      localStorage.removeItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
      applyTheme(prefersDark);
    } catch (error) {
      console.warn("Failed to reset theme:", error);
    }
  };

  const value = {
    isDarkMode,
    toggleTheme,
    setTheme,
    resetTheme,
    isLoading,
    theme: isDarkMode ? "dark" : "light",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
