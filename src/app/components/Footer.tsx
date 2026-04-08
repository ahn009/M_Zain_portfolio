"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Heart, ArrowUp, MapPin, Phone, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Home", key: "home" },
  { label: "About", key: "about" },
  { label: "Experience", key: "experience" },
  { label: "Projects", key: "projects" },
  { label: "Contact", key: "contact" },
];

const socialLinks = [
  { icon: Mail, label: "Email", href: "mailto:muhammazain84@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export default function Footer({
  currentPage,
  onNavigate,
}: {
  currentPage: string;
  onNavigate: (page: string) => void;
}) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentYear] = useState(new Date().getFullYear());

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setShowBackToTop(scrollY > 400);
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
    setScrollProgress(Math.min(progress, 100));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto border-t-0 bg-background overflow-hidden">
      {/* ── Decorative Top Border Gradient ── */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-emerald-300 to-amber-400" />

      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-emerald-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <motion.div
          className="relative mt-12 mb-12 rounded-2xl border border-surface-border bg-surface-elevated p-6 sm:p-8 text-center shadow-xl shadow-black/5 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-gradient-shift opacity-60"
              style={{
                background: 'radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)',
                backgroundSize: '200% 200%',
              }}
            />
          </div>
          <div className="relative">
            <div className="flex justify-center mb-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-green shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
              Let&apos;s Build Something Great Together
            </h3>
            <p className="text-text-secondary text-sm sm:text-base max-w-md mx-auto mb-5">
              I&apos;m always open to new opportunities and meaningful collaborations. Let&apos;s connect and create impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate("contact")}
                className="bg-gradient-green btn-shine inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </button>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-xl border-2 border-amber-500/50 px-6 py-3 text-sm font-semibold text-amber-500 transition-all duration-300 hover:border-amber-500 hover:bg-amber-500/10"
              >
                Download CV
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => onNavigate("home")}
              className="inline-block text-3xl font-bold text-gradient-animate mb-3 cursor-pointer"
            >
              MZ
            </button>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Dedicated operations professional in the food and dairy industry, passionate about operational excellence and team leadership.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-text-muted text-xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-400/70" />
                <span>Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted text-xs">
                <Phone className="w-3.5 h-3.5 text-emerald-400/70" />
                <span>+92 306 8660656</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted text-xs">
                <Mail className="w-3.5 h-3.5 text-emerald-400/70" />
                <span>muhammazain84@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => onNavigate(link.key)}
                    className={cn(
                      "text-sm transition-colors duration-200 cursor-pointer",
                      currentPage === link.key
                        ? "text-emerald-400 font-medium"
                        : "text-text-secondary hover:text-emerald-400"
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Connect */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Connect
            </h4>
            <div className="flex items-center gap-3 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl border border-surface-border bg-surface text-text-secondary hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Available for international opportunities. Let&apos;s connect and discuss how I can contribute to your team.
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-surface-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-xs">
              &copy; {currentYear} Muhammad Zain. All Rights Reserved.
            </p>
            <p className="text-text-muted text-xs flex items-center gap-1.5">
              Designed &amp; Built with{" "}
              <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />{" "}
              by Muhammad Zain
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top button with progress ring */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            aria-label={`Scroll to top - ${Math.round(scrollProgress)}%`}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-surface-elevated/90 border border-surface-border backdrop-blur-xl shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/30 hover:scale-110 transition-all duration-300 z-50 cursor-pointer group flex items-center justify-center"
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24" cy="24" r="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-surface-border/50"
              />
              <circle
                cx="24" cy="24" r="21"
                fill="none"
                stroke="url(#progress-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 21}`}
                strokeDashoffset={`${2 * Math.PI * 21 * (1 - scrollProgress / 100)}`}
                className="progress-ring-circle"
              />
              <defs>
                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
              </defs>
            </svg>
            <ArrowUp className="w-4 h-4 text-emerald-500 transition-transform duration-300 group-hover:-translate-y-0.5 relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
