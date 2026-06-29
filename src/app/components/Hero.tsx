"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Download,
  ChevronDown,
} from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import Image from "next/image";

/* ──────────────────────────────────────────────
   Typing-effect hook
   ────────────────────────────────────────────── */
const TYPING_SPEED = 60;
const DELETING_SPEED = 30;
const PAUSE_AFTER_TYPING = 2000;
const PAUSE_BEFORE_TYPING = 500;

const roles = [
  "F&B Operations Manager",
  "Shift Management Lead",
  "Production Floor Supervisor",
  "Quality Control Coordinator",
  "Supply Chain & Inventory Controller",
];

function useTypingEffect() {
  const [displayText, setDisplayText] = useState("");
  const roleIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const phaseRef = useRef<"typing" | "deleting" | "waiting">("typing");
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      if (!mountedRef.current) return;

      const currentRole = roles[roleIndexRef.current];
      const phase = phaseRef.current;

      if (phase === "typing") {
        if (charIndexRef.current < currentRole.length) {
          charIndexRef.current += 1;
          setDisplayText(currentRole.slice(0, charIndexRef.current));
          timeoutId = setTimeout(tick, TYPING_SPEED);
        } else {
          phaseRef.current = "waiting";
          timeoutId = setTimeout(() => {
            phaseRef.current = "deleting";
            tick();
          }, PAUSE_AFTER_TYPING);
        }
      } else if (phase === "deleting") {
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1;
          setDisplayText(currentRole.slice(0, charIndexRef.current));
          timeoutId = setTimeout(tick, DELETING_SPEED);
        } else {
          roleIndexRef.current = (roleIndexRef.current + 1) % roles.length;
          phaseRef.current = "waiting";
          timeoutId = setTimeout(() => {
            phaseRef.current = "typing";
            tick();
          }, PAUSE_BEFORE_TYPING);
        }
      }
    };

    tick();

    return () => {
      mountedRef.current = false;
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return displayText;
}

/* ──────────────────────────────────────────────
   Animation variants
   ────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const floatSymbol = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: 0.8 + i * 0.3,
      duration: 1,
    },
  }),
};

const stats = [
  {
    value: "1.5",
    suffix: "+",
    label: "Years Experience",
    icon: "📈",
  },
  {
    value: "4",
    suffix: "",
    label: "Merit-Based Promotions",
    icon: "🚀",
  },
  {
    value: "95",
    suffix: "%+",
    label: "Satisfaction",
    icon: "⭐",
  },
  {
    value: "100",
    suffix: "%",
    label: "Dedication",
    icon: "💪",
  },
];

/* ──────────────────────────────────────────────
   Interactive Cursor Particles
   ────────────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

function useCursorParticles(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idCounter = useRef(0);
  const animFrame = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticle: Particle = {
      id: idCounter.current++,
      x,
      y,
      size: Math.random() * 4 + 2,
      opacity: 0.6,
      color: Math.random() > 0.5 ? "#10b981" : "#d4af37",
    };

    setParticles((prev) => [...prev.slice(-30), newParticle]);

    cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.015, size: p.size * 0.995 }))
          .filter((p) => p.opacity > 0)
      );
    });
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame.current);
    };
  }, [handleMouseMove, containerRef]);

  return particles;
}

/* ──────────────────────────────────────────────
   Hero component
   ────────────────────────────────────────────── */
export default function Hero({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const typedText = useTypingEffect();
  const heroRef = useRef<HTMLDivElement>(null);
  const particles = useCursorParticles(heroRef);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen bg-grid noise-overlay aurora-bg overflow-hidden">
      {/* Blinking cursor keyframes */}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes avatar-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.2), 0 0 60px rgba(16, 185, 129, 0.1); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.3), 0 0 80px rgba(16, 185, 129, 0.15); }
        }
        @keyframes avatar-border-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Cursor Particles */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* ── Animated Gradient Mesh Background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large emerald blob */}
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] bg-emerald-500/20 blur-[120px] animate-morph-blob" />
        {/* Gold blob */}
        <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] bg-amber-500/15 blur-[100px] animate-morph-blob" style={{ animationDelay: '4s' }} />
        {/* Small green accent */}
        <div className="absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 bg-emerald-500/5 blur-[80px] animate-morph-blob" style={{ animationDelay: '2s' }} />
      </div>

      {/* ── Floating Code Symbols (hidden on small screens) ── */}
      <div className="pointer-events-none absolute inset-0 hidden md:block select-none">
        <motion.span
          className="absolute top-[18%] left-[8%] text-5xl font-mono text-emerald-500/[0.06]"
          variants={floatSymbol}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          &lt;/&gt;
        </motion.span>
        <motion.span
          className="absolute top-[30%] right-[10%] text-5xl font-mono text-amber-500/[0.06]"
          variants={floatSymbol}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {"{ }"}
        </motion.span>
        <motion.span
          className="absolute bottom-[32%] left-[15%] text-5xl font-mono text-emerald-500/[0.06]"
          variants={floatSymbol}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          =&gt;
        </motion.span>
        <motion.span
          className="absolute top-[60%] right-[18%] text-4xl font-mono text-amber-500/[0.05]"
          variants={floatSymbol}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          ( )
        </motion.span>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 pt-20 sm:px-6 lg:px-8">
        <div className="w-full text-center md:text-left md:flex md:items-center md:gap-12">
          {/* Avatar */}
          <motion.div
            className="mb-8 md:mb-0 flex-shrink-0 flex justify-center md:justify-start"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <div className="relative">
              {/* Rotating gradient border */}
              <div className="absolute -inset-1 rounded-full opacity-70" style={{ background: 'conic-gradient(from 0deg, #10b981, #d4af37, #10b981, #34d399, #10b981)', animation: 'avatar-border-spin 6s linear infinite' }} />
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-background" style={{ animation: 'avatar-glow 4s ease-in-out infinite' }}>
                <Image
                  src="/avatar.png"
                  alt="Muhammad Zain - Assistant Manager"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Online status badge */}
              <div className="absolute bottom-2 right-2 z-10">
                <span className="relative flex h-5 w-5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-5 w-5 rounded-full bg-emerald-500 border-2 border-background" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1">
          {/* Status Badge */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface px-4 py-1.5 backdrop-blur-sm"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-text-secondary">
              Open to International Opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            className="mb-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Hi, I&apos;m</span>
              <span className="text-gradient block mt-2">Muhammad Zain</span>
            </h1>
          </motion.div>

          {/* Subtitle with Typing Animation */}
          <motion.div
            className="mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <p className="text-lg font-semibold text-amber-500 sm:text-xl md:text-2xl">
              I am{" "}
              {typedText && /^[aeiouAEIOU]/.test(typedText) ? "an" : "a"}&nbsp;
              <span className="inline-block min-w-[80px] sm:min-w-[160px] md:min-w-[240px]">
                {typedText}
                <span
                  className="inline-block ml-0.5 text-amber-500"
                  style={{
                    animation: "cursor-blink 1s step-end infinite",
                  }}
                >
                  |
                </span>
              </span>
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="mb-8 max-w-2xl mx-auto md:mx-0"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
              Results-driven F&amp;B Operations &amp; Production Management
              professional with 1.5 years of progressive experience, earning 4
              merit-based promotions from entry-level to Assistant Manager.
              Specialized in shift management, SOP development, quality control,
              inventory management, and production workflow optimization in the
              food manufacturing sector.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="mb-8 flex flex-col items-center gap-4 sm:flex-row md:items-start"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <button
              onClick={() => onNavigate?.("experience")}
              className="bg-gradient-green group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110 press-scale cursor-pointer"
            >
              View Experience
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 rounded-xl border-2 border-amber-500/60 px-6 py-3 text-sm font-semibold text-amber-500 transition-all duration-300 hover:border-amber-500 hover:bg-amber-500/10"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <button
              onClick={() => onNavigate?.("contact")}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-amber-500/60 px-6 py-3 text-sm font-semibold text-amber-500 transition-all duration-300 hover:border-amber-500 hover:bg-amber-500/10 cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-4 md:justify-start"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            <a
              href="mailto:muhammazain84@gmail.com"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-border bg-surface text-text-secondary transition-all duration-300 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-500/10"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-border bg-surface text-text-secondary transition-all duration-300 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-500/10"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-border bg-surface text-text-secondary transition-all duration-300 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-500/10"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </motion.div>
          </div>
          {/* end flex-1 */}
        </div>
      </div>

      {/* ── Stats Section ── */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-hover rounded-xl border border-surface-border bg-surface p-4 text-center backdrop-blur-sm transition-colors duration-300 hover:border-emerald-500 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.0 + index * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-2 text-2xl">{stat.icon}</div>
              <div className="text-2xl font-bold sm:text-3xl counter-glow-animate">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs text-text-muted sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll Down Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
      >
        <button
          onClick={() => onNavigate?.("about")}
          className="group flex flex-col items-center gap-2 cursor-pointer"
          aria-label="Scroll to About section"
        >
          <span className="text-xs font-medium text-text-muted uppercase tracking-widest transition-colors group-hover:text-emerald-400">
            Scroll Down
          </span>
          <ChevronDown className="h-5 w-5 text-text-muted bounce-gentle transition-colors group-hover:text-emerald-400" />
        </button>
      </motion.div>

    </section>
  );
}
