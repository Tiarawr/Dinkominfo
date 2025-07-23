import { React, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home";
import EKliping from "./ekliping";
import EBook from "./ebook";
import Kontak from "./contact";
import About from "./about";
import { ThemeProvider } from "./components/ThemeSwitch";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./dashboard";
import LoginPage from "./Login";

function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  useScrollToTop();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/e-kliping" element={<EKliping />} />
        <Route path="/e-book" element={<EBook />} />
        <Route path="/contact" element={<Kontak />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}
