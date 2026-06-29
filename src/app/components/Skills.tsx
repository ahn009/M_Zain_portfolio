"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Store,
  Users,
  HandCoins,
  PackageCheck,
  UserCheck,
  ShieldCheck,
  CalendarClock,
  Table2,
  FileText,
  Monitor,
  Keyboard,
  Database,
  Laptop,
  Smartphone,
  Instagram,
  Video,
  Share2,
  UsersRound,
  Megaphone,
  Award,
} from "lucide-react";
import { Wrench, Sparkles } from "lucide-react";
import SkillsRadar from "./SkillsRadar";

interface Skill {
  name: string;
  icon: React.ElementType;
}

interface SkillColumn {
  title: string;
  icon: React.ElementType;
  color: "emerald" | "blue" | "amber";
  skills: Skill[];
}

const skillColumns: SkillColumn[] = [
  {
    title: "Operations & Production",
    icon: Store,
    color: "emerald",
    skills: [
      { name: "F&B Operations Management", icon: Store },
      { name: "Quality Assurance & Service Excellence", icon: Users },
      { name: "Revenue & Financial Reconciliation", icon: HandCoins },
      { name: "Inventory Management", icon: PackageCheck },
      { name: "Team Leadership", icon: UserCheck },
      { name: "Quality Control & Compliance", icon: ShieldCheck },
      { name: "Shift & Workforce Scheduling", icon: CalendarClock },
    ],
  },
  {
    title: "Technical Skills",
    icon: Wrench,
    color: "blue",
    skills: [
      { name: "Microsoft Excel", icon: Table2 },
      { name: "Microsoft Word", icon: FileText },
      { name: "POS Systems", icon: Monitor },
      { name: "Data Entry", icon: Database },
      { name: "Computer Operations", icon: Laptop },
      { name: "Digital Literacy", icon: Keyboard },
    ],
  },
  {
    title: "Digital & Marketing",
    icon: Sparkles,
    color: "amber",
    skills: [
      { name: "Instagram Content", icon: Smartphone },
      { name: "TikTok Video Creation", icon: Video },
      { name: "Social Media Management", icon: Share2 },
      { name: "Community Building", icon: UsersRound },
      { name: "Basic Digital Marketing", icon: Megaphone },
      { name: "Brand Promotion", icon: Award },
    ],
  },
];

const colorClasses: Record<string, { pill: string; icon: string; badge: string; border: string }> = {
  emerald: {
    pill: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40",
    icon: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    border: "hover:border-emerald-500/30",
  },
  blue: {
    pill: "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40",
    icon: "text-blue-400",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    border: "hover:border-blue-500/30",
  },
  amber: {
    pill: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40",
    icon: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    border: "hover:border-amber-500/30",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-secondary"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Decorative glows */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Sparkles className="w-4 h-4" />
            What I Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Skills & <span className="text-gradient-green">Expertise</span>
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto text-sm md:text-base">
            A diverse skill set spanning retail operations, technology, and digital marketing — built through hands-on experience.
          </p>
        </motion.div>

        {/* Skills Radar Chart */}
        <div className="mb-16">
          <SkillsRadar />
        </div>

        {/* Skill Columns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {skillColumns.map((column) => {
            const colors = colorClasses[column.color];
            const ColumnIcon = column.icon;
            return (
              <motion.div
                key={column.title}
                className={`rounded-2xl border border-surface-border bg-surface-elevated p-6 card-hover transition-colors duration-300 ${colors.border}`}
                variants={cardVariants}
              >
                {/* Column Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-lg ${colors.badge} flex items-center justify-center`}>
                    <ColumnIcon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {column.title}
                  </h3>
                </div>

                {/* Skills Pills */}
                <div className="flex flex-wrap gap-2">
                  {column.skills.map((skill, idx) => {
                    const SkillIcon = skill.icon;
                    return (
                      <motion.span
                        key={skill.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`tag-pill inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border cursor-default transition-colors duration-200 ${colors.pill}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                      >
                        <SkillIcon className={`w-3.5 h-3.5 ${colors.icon}`} />
                        {skill.name}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
