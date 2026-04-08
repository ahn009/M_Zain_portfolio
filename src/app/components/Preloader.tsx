"use client";

import { useState, useEffect, useSyncExternalStore, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const PRELOADER_DURATION = 2000; // 2 seconds

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { theme } = useTheme();

  // Animate progress bar from 0 to 100
  useEffect(() => {
    if (!mounted) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / PRELOADER_DURATION) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Small delay after progress completes before fading out
        setTimeout(() => setIsLoading(false), 200);
      }
    }, 16); // ~60fps updates

    return () => clearInterval(interval);
  }, [mounted]);

  const isDark = mounted && (theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches));

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden no-theme-transition"
            style={{
              backgroundColor: isDark ? "var(--background, #0f1115)" : "var(--background, #ffffff)",
            }}
          >
            {/* ─── Animated Background Blobs ─── */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Emerald blob - top left */}
              <div
                className="animate-morph-blob absolute -top-20 -left-20 h-72 w-72 opacity-20 sm:h-96 sm:w-96"
                style={{
                  background: "radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)",
                  animationDelay: "0s",
                }}
              />
              {/* Gold blob - bottom right */}
              <div
                className="animate-morph-blob absolute -bottom-24 -right-24 h-80 w-80 opacity-15 sm:h-[28rem] sm:w-[28rem]"
                style={{
                  background: "radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)",
                  animationDelay: "2s",
                }}
              />
              {/* Emerald blob - center right */}
              <div
                className="animate-morph-blob absolute -right-10 top-1/3 h-56 w-56 opacity-10 sm:h-72 sm:w-72"
                style={{
                  background: "radial-gradient(circle, rgba(52,211,153,0.3) 0%, transparent 70%)",
                  animationDelay: "4s",
                }}
              />
              {/* Subtle grid overlay */}
              <div className="bg-grid absolute inset-0" />
            </div>

            {/* ─── MZ Initials ─── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative z-10"
            >
              <span className="text-gradient-animate text-7xl font-extrabold tracking-tighter select-none sm:text-8xl md:text-9xl">
                MZ
              </span>
            </motion.div>

            {/* ─── Subtitle ─── */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="relative z-10 mt-4 text-sm font-medium tracking-widest uppercase select-none sm:text-base"
              style={{
                color: isDark ? "var(--text-muted, #737373)" : "var(--text-muted, #737373)",
              }}
            >
              Portfolio
            </motion.p>

            {/* ─── Progress Bar ─── */}
            <div className="relative z-10 mt-10 w-48 sm:w-60">
              {/* Track */}
              <div
                className="h-[3px] w-full overflow-hidden rounded-full"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)",
                }}
              >
                {/* Fill */}
                <motion.div
                  className="h-full rounded-full scroll-progress-bar"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              {/* Percentage text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mt-3 text-center text-xs font-mono tabular-nums"
                style={{
                  color: isDark
                    ? "var(--text-muted, #737373)"
                    : "var(--text-muted, #737373)",
                }}
              >
                {Math.round(progress)}%
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main Content ─── */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
