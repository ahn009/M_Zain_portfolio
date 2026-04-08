"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollProgress from "./components/ScrollProgress";
import WhatsAppButton from "./components/WhatsAppButton";
import Preloader from "./components/Preloader";
import CommandPalette from "./components/CommandPalette";

export type PageKey = "home" | "about" | "experience" | "projects" | "contact";

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageKey>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash && ["home", "about", "experience", "projects", "contact"].includes(hash)) {
        return hash as PageKey;
      }
    }
    return "home";
  });

  const navigate = useCallback((page: PageKey) => {
    setCurrentPage(page);
    window.history.pushState(null, "", `#${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      if (["home", "about", "experience", "projects", "contact"].includes(hash)) {
        setCurrentPage(hash as PageKey);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Hero onNavigate={navigate} />;
      case "about":
        return <About />;
      case "experience":
        return <Experience />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      default:
        return <Hero onNavigate={navigate} />;
    }
  };

  return (
    <Preloader>
      <div className="flex min-h-screen flex-col">
        <ScrollProgress />
        <Navbar currentPage={currentPage} onNavigate={navigate} />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer currentPage={currentPage} onNavigate={navigate} />
        <WhatsAppButton />
        <CommandPalette onNavigate={navigate} />
      </div>
    </Preloader>
  );
}
