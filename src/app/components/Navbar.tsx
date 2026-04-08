"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, ArrowRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", key: "home" },
  { label: "About", key: "about" },
  { label: "Experience", key: "experience" },
  { label: "Projects", key: "projects" },
  { label: "Contact", key: "contact" },
];

export default function Navbar({
  currentPage,
  onNavigate,
}: {
  currentPage: string;
  onNavigate: (page: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNav = (key: string) => {
    onNavigate(key);
    setMobileOpen(false);
  };

  return (
    <nav
      id="navbar"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-nav-bg backdrop-blur-xl border-b border-surface-border"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-18">
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="group flex items-center gap-2.5 cursor-pointer"
          >
            <span className="text-gradient-animate text-2xl font-bold tracking-tight md:text-[1.65rem]">
              MZ
            </span>
            <span className="hidden text-xs font-medium text-text-muted group-hover:text-text-secondary transition-colors md:inline">
              Assistant Manager
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = currentPage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNav(item.key)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
                    isActive
                      ? "text-emerald-500"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300",
                      isActive
                        ? "w-4/5 bg-gradient-to-r from-emerald-500 to-emerald-600"
                        : "w-0 bg-transparent"
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border bg-surface text-text-secondary transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500 cursor-pointer"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mounted && theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-emerald-400 transition-colors duration-200"
            >
              <Download className="h-4 w-4" />
              <span>Resume</span>
            </a>

            {/* Hire Me Button */}
            <Button
              size="sm"
              onClick={() => handleNav("contact")}
              className="group relative overflow-hidden rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-5 text-sm font-medium text-emerald-500 transition-all duration-300 hover:border-emerald-500 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 hover:text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Hire Me
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Button>
          </div>

          {/* Mobile Section */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border bg-surface text-text-secondary transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500 cursor-pointer"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
            </button>

            {/* Mobile Hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border bg-surface text-text-secondary transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500 cursor-pointer"
                  aria-label="Open menu"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] border-l border-surface-border bg-surface backdrop-blur-xl"
              >
                <SheetHeader className="pb-2">
                  <SheetTitle className="flex items-center gap-2">
                    <span className="text-gradient text-xl font-bold">MZ</span>
                    <span className="text-xs text-text-muted">| Assistant Manager</span>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Nav Items */}
                <div className="mt-6 flex flex-col gap-1">
                  {navItems.map((item, index) => {
                    const isActive = currentPage === item.key;
                    return (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                      >
                        <SheetClose asChild>
                          <button
                            onClick={() => handleNav(item.key)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer text-left",
                              isActive
                                ? "bg-emerald-500/10 text-emerald-500"
                                : "text-text-secondary hover:bg-surface hover:text-text-primary"
                            )}
                          >
                            <span
                              className={cn(
                                "h-1.5 w-1.5 rounded-full transition-all duration-200",
                                isActive ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-surface-border"
                              )}
                            />
                            {item.label}
                          </button>
                        </SheetClose>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile Hire Me Button */}
                <div className="mt-6 px-1">
                  <SheetClose asChild>
                    <Button
                      size="sm"
                      onClick={() => handleNav("contact")}
                      className="group w-full rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-5 text-sm font-medium text-emerald-500 transition-all duration-300 hover:border-emerald-500 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 hover:text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        Hire Me
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </Button>
                  </SheetClose>
                </div>

                {/* Mobile Footer */}
                <div className="mt-auto border-t border-surface-border pt-4">
                  <SheetClose asChild>
                    <button
                      onClick={() => handleNav("home")}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-emerald-400 transition-colors duration-200 cursor-pointer text-left"
                    >
                      <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
                      Back to Home
                    </button>
                  </SheetClose>
                  <p className="px-4 pt-2 text-xs text-text-muted">
                    &copy; {new Date().getFullYear()} Muhammad Zain. All rights reserved.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Bottom border gradient on scroll */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="h-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </div>
    </nav>
  );
}
