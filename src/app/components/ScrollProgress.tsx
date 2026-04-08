"use client";

import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setProgress(Math.min(pct, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
      <div
        className="scroll-progress-bar h-full rounded-r-full"
        style={{
          width: `${progress}%`,
          opacity: progress > 0.5 ? 1 : 0,
          transition: "width 0.1s linear, opacity 0.3s ease",
        }}
      />
    </div>
  );
}
