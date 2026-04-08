"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  User,
  MessageSquare,
  Clock,
  Globe2,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import FAQ from "./FAQ";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "muhammazain84@gmail.com",
    href: "mailto:muhammazain84@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 306 8660656",
    href: "tel:+923068660656",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Karachi, Pakistan",
    href: undefined,
  },
];

/* ─── Contact Info Card with Copy-to-Clipboard ─── */
function ContactInfoCard({ item }: { item: typeof contactInfo[number] }) {
  const [copied, setCopied] = useState(false);
  const Icon = item.icon;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl border border-surface-border bg-surface backdrop-blur-sm hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors duration-300">
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-text-muted">{item.label}</p>
        {item.href ? (
          <a
            href={item.href}
            className="text-text-primary hover:text-emerald-400 transition-colors duration-200 truncate block text-sm font-medium"
          >
            {item.value}
          </a>
        ) : (
          <p className="text-text-primary truncate text-sm font-medium">{item.value}</p>
        )}
      </div>
      {/* Action buttons */}
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {item.href ? (
          <a
            href={item.href}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-surface-border bg-surface text-text-muted hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-200"
            aria-label={`Open ${item.label}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : null}
        <button
          onClick={handleCopy}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-surface-border bg-surface text-text-muted hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-200 cursor-pointer"
          aria-label={`Copy ${item.label}`}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "#",
  },
];

function getKarachiTime() {
  const now = new Date();
  // Karachi is UTC+5
  const karachiTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
  const hours = karachiTime.getHours();
  const minutes = karachiTime.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

function isAvailable() {
  const now = new Date();
  const karachiTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
  const hours = karachiTime.getHours();
  const day = karachiTime.getDay();
  // Available: Mon-Sat, 9AM - 9PM
  const isWeekday = day >= 1 && day <= 6;
  const isWorkingHours = hours >= 9 && hours < 21;
  return isWeekday && isWorkingHours;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [karachiTime, setKarachiTime] = useState(getKarachiTime());
  const [available, setAvailable] = useState(isAvailable());

  useEffect(() => {
    const interval = setInterval(() => {
      setKarachiTime(getKarachiTime());
      setAvailable(isAvailable());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Message sent successfully!", {
          description:
            "Thank you for reaching out. I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-24 overflow-hidden bg-secondary"
      >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-gold text-black border-0 px-4 py-1 text-sm font-medium">
            Get in Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Contact <span className="text-gradient-green">Me</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities and connections
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14"
        >
          {/* Left Column - Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              Let&apos;s connect
            </h3>

            {/* Availability Status Card */}
            <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
              available
                ? "border-emerald-500/30 bg-emerald-500/5"
                : "border-surface-border bg-surface"
            }`}>
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-300 ${
                available
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-amber-500/10 text-amber-400"
              }`}>
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`relative flex h-2.5 w-2.5 ${available ? '' : 'opacity-50'}`}>
                    {available && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    )}
                    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                      available ? 'bg-emerald-500' : 'bg-amber-500'
                    }`} />
                  </span>
                  <span className={`text-sm font-semibold ${available ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {available ? "Available Now" : "Currently Offline"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Globe2 className="w-3 h-3 text-text-muted" />
                  <span className="text-xs text-text-muted">
                    Karachi, PK &middot; {karachiTime} (PKT)
                  </span>
                </div>
                <span className="text-xs text-text-muted mt-0.5 block">
                  {available
                    ? "Typically replies within an hour"
                    : "Mon-Sat, 9AM-9PM PKT"}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item) => (
                <ContactInfoCard key={item.label} item={item} />
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-sm text-text-muted mb-4">Follow me on</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex items-center justify-center w-12 h-12 rounded-xl border border-surface-border bg-surface text-text-secondary hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-300 hover:scale-105"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative quote */}
            <div className="mt-8 p-5 rounded-xl border-l-4 border-emerald-500/50 bg-emerald-500/5">
              <p className="text-text-secondary italic text-sm leading-relaxed">
                &ldquo;Great things in business are never done by one person;
                they&apos;re done by a team of people.&rdquo;
              </p>
              <p className="text-emerald-400 text-xs mt-2">— Steve Jobs</p>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl border border-surface-border bg-surface backdrop-blur-sm space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-text-secondary flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-surface border-surface-border text-text-primary placeholder:text-text-muted focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-text-secondary flex items-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-surface border-surface-border text-text-primary placeholder:text-text-muted focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-text-secondary flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-surface border-surface-border text-text-primary placeholder:text-text-muted focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20 h-11"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-text-secondary flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or idea..."
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-surface border-surface-border text-text-primary placeholder:text-text-muted focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-green text-white font-semibold text-base hover:opacity-90 transition-opacity border-0 cursor-pointer"
              >
                {isSubmitting ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </motion.span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </div>
  );
}
