"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const targetNum = parseFloat(value);
    const isDecimal = value.includes(".");
    const decimalPlaces = isDecimal ? value.split(".")[1].length : 0;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const current = easedProgress * targetNum;

      if (isDecimal) {
        setDisplayValue(current.toFixed(decimalPlaces));
      } else {
        setDisplayValue(Math.round(current).toString());
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Ensure final value is exact
        if (isDecimal) {
          setDisplayValue(targetNum.toFixed(decimalPlaces));
        } else {
          setDisplayValue(targetNum.toString());
        }
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="text-gradient-green">
      {displayValue}
      {suffix}
    </span>
  );
}
