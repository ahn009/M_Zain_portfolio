"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Settings, Users, Heart, Sparkles } from "lucide-react";

/* ──────────────────────────────────────────────
   Value proposition data
   ────────────────────────────────────────────── */
const cards = [
  {
    icon: TrendingUp,
    title: "Rapid Growth",
    description:
      "4 merit-based promotions in 18 months — a track record of accelerated career development through exceptional operational performance.",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-emerald-400",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/40",
    glowColor: "group-hover:shadow-emerald-500/10",
  },
  {
    icon: Settings,
    title: "Operations Excellence",
    description:
      "Comprehensive hands-on experience in F&B production operations, shift management, inventory control, and quality assurance across multiple operational departments.",
    gradientFrom: "from-amber-500",
    gradientTo: "to-amber-400",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderColor: "hover:border-amber-500/40",
    glowColor: "group-hover:shadow-amber-500/10",
  },
  {
    icon: Users,
    title: "Team Leadership",
    description:
      "Trained and mentored 10+ team members across 4 departments, fostering collaborative work environments.",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-emerald-400",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/40",
    glowColor: "group-hover:shadow-emerald-500/10",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description:
      "Maintained 95%+ customer satisfaction ratings through consistent service excellence and efficient issue resolution.",
    gradientFrom: "from-amber-500",
    gradientTo: "to-amber-400",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderColor: "hover:border-amber-500/40",
    glowColor: "group-hover:shadow-amber-500/10",
  },
];

/* ──────────────────────────────────────────────
   Animation variants
   ────────────────────────────────────────────── */
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ──────────────────────────────────────────────
   WhyHireMe component
   ────────────────────────────────────────────── */
export default function WhyHireMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="why-hire-me"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-secondary"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[350px] h-[350px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Sparkles className="w-4 h-4" />
            Why Choose Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Why <span className="text-gradient">Hire Me</span>
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto text-sm md:text-base">
            A compelling combination of rapid growth, hands-on expertise, and an
            unwavering commitment to excellence.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                className={`group relative rounded-xl border border-surface-border bg-surface-elevated p-6 glow-border-hover card-hover ${card.borderColor} transition-all duration-300`}
                variants={cardVariants}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">
                  <span
                    className={`bg-gradient-to-r ${card.gradientFrom} ${card.gradientTo} bg-clip-text text-transparent`}
                  >
                    {card.title}
                  </span>
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-text-secondary">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
