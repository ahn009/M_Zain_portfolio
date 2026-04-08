"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/923068660656"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_24px_rgba(37,211,102,0.45)] focus:outline-none"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full whatsapp-pulse" />

          {/* WhatsApp SVG Icon */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            className="relative z-10 h-7 w-7"
          >
            <path
              d="M16.003 2.667A13.333 13.333 0 0 0 4.33 20.073L2.667 27.333l7.396-2.233A13.3 13.3 0 0 0 16.003 26.667 13.333 13.333 0 0 0 16.003 2.667Zm0 24a11 11 0 0 1-5.589-1.523l-.4-.237-4.147 1.25 1.107-4.04-.261-.415A11 11 0 1 1 16.003 26.667Zm6.036-8.246c-.331-.165-1.961-.967-2.265-1.077-.304-.11-.525-.165-.746.165-.221.331-.857 1.077-1.051 1.298-.194.221-.388.249-.719.083-.331-.166-1.397-.515-2.663-1.644-.984-.877-1.649-1.96-1.843-2.291-.194-.331-.021-.51.145-.674.149-.149.331-.388.497-.582.165-.194.221-.331.331-.552.11-.221.055-.415-.027-.582-.083-.166-.746-1.799-1.023-2.463-.269-.645-.543-.557-.746-.567l-.636-.011a1.215 1.215 0 0 0-.883.413c-.303.331-1.156 1.13-1.156 2.759s1.184 3.202 1.349 3.423c.166.221 2.331 3.56 5.648 4.992.789.34 1.404.543 1.884.695.792.252 1.512.216 2.081.131.635-.094 1.961-.801 2.238-1.574.277-.773.277-1.435.194-1.574-.083-.139-.304-.221-.635-.386Z"
              fill="white"
            />
          </svg>

          {/* Tooltip */}
          <span className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900">
            Chat on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
