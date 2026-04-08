"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, Package, Users, TrendingUp, X, CheckCircle, Target, BarChart3, ArrowRight, Trophy, Building2, Zap, Sparkles } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  icon: React.ElementType;
  description: string;
  tags: string[];
  color: string;
  accentColor: string;
  details: {
    metrics: string[];
    impact: string[];
    skills: string[];
  };
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "95% Customer Satisfaction",
    icon: Heart,
    description:
      "Maintained exceptional customer service ratings by delivering outstanding client experiences, resolving concerns efficiently, and ensuring every interaction reflects the highest standards of quality and care.",
    tags: ["Customer Service", "Client Relations"],
    color: "emerald",
    accentColor: "#10b981",
    details: {
      metrics: [
        "95%+ sustained satisfaction rating",
        "50+ customer concerns resolved monthly",
        "Zero critical service complaints",
      ],
      impact: [
        "Established customer loyalty and repeat business patterns",
        "Created a service-first culture across the team",
        "Implemented feedback-driven quality improvements",
      ],
      skills: ["Active Listening", "Conflict Resolution", "Quality Management"],
    },
  },
  {
    id: 2,
    title: "Inventory Optimization",
    icon: Package,
    description:
      "Streamlined stock management and built strong supplier relationships to optimize product availability, reduce waste, and ensure continuous supply chain efficiency across all operations.",
    tags: ["Supply Chain", "Operations"],
    color: "blue",
    accentColor: "#3b82f6",
    details: {
      metrics: [
        "30% reduction in stock waste",
        "99%+ product availability rate",
        "15+ active supplier relationships",
      ],
      impact: [
        "Improved cash flow through better inventory turns",
        "Reduced emergency orders and last-minute costs",
        "Developed seasonal demand forecasting methods",
      ],
      skills: ["Stock Management", "Supplier Relations", "Demand Forecasting"],
    },
  },
  {
    id: 3,
    title: "Team Development Program",
    icon: Users,
    description:
      "Trained and mentored team members across various departments, fostering a collaborative work environment that enhanced operational efficiency and individual professional growth.",
    tags: ["Leadership", "Training"],
    color: "amber",
    accentColor: "#f59e0b",
    details: {
      metrics: [
        "10+ team members trained and mentored",
        "4 departments cross-trained",
        "80%+ trainee retention rate",
      ],
      impact: [
        "Built a versatile, multi-skilled workforce",
        "Reduced onboarding time for new hires by 40%",
        "Created standard operating procedures for all roles",
      ],
      skills: ["Mentoring", "Cross-Training", "SOP Development"],
    },
  },
  {
    id: 4,
    title: "Cost Optimization Strategy",
    icon: TrendingUp,
    description:
      "Drove business growth through strategic process improvements, cost optimization initiatives, and customer retention strategies that contributed to increased revenue and operational excellence.",
    tags: ["Strategy", "Growth"],
    color: "emerald",
    accentColor: "#10b981",
    details: {
      metrics: [
        "3 promotions in 16 months",
        "Significant operational cost reductions",
        "Consistent revenue growth contribution",
      ],
      impact: [
        "Identified and eliminated inefficiencies across operations",
        "Improved daily cash reconciliation processes",
        "Contributed to strategic business growth planning",
      ],
      skills: ["Process Optimization", "Financial Analysis", "Strategic Planning"],
    },
  },
];

const colorClasses: Record<string, { iconBg: string; tagBg: string; tagText: string; border: string; glow: string; detailBg: string; detailAccent: string; borderLeft: string }> = {
  emerald: {
    iconBg: "bg-gradient-green",
    tagBg: "bg-emerald-500/10",
    tagText: "text-emerald-400",
    border: "border-emerald-500/20",
    glow: "hover:border-emerald-500/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]",
    detailBg: "bg-emerald-500/5",
    detailAccent: "text-emerald-400",
    borderLeft: "border-l-emerald-500",
  },
  blue: {
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    tagBg: "bg-blue-500/10",
    tagText: "text-blue-400",
    border: "border-blue-500/20",
    glow: "hover:border-blue-500/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]",
    detailBg: "bg-blue-500/5",
    detailAccent: "text-blue-400",
    borderLeft: "border-l-blue-500",
  },
  amber: {
    iconBg: "bg-gradient-gold",
    tagBg: "bg-amber-500/10",
    tagText: "text-amber-400",
    border: "border-amber-500/20",
    glow: "hover:border-amber-500/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]",
    detailBg: "bg-amber-500/5",
    detailAccent: "text-amber-400",
    borderLeft: "border-l-amber-500",
  },
};

/* ─── Stats data for the Summary Stats Bar ─── */
const summaryStats = [
  { icon: Trophy, label: "4 Key Achievements", accent: "#10b981" },
  { icon: Building2, label: "3+ Departments", accent: "#d4af37" },
  { icon: Zap, label: "100% Impact Driven", accent: "#10b981" },
  { icon: Sparkles, label: "Continuous Growth", accent: "#f59e0b" },
];

/* ─── Animation variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
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

const statsBarVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

const statsItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ─── Animated accent line keyframe ─── */
const accentLineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

function ProjectModal({
  achievement,
  onClose,
}: {
  achievement: Achievement;
  onClose: () => void;
}) {
  const colors = colorClasses[achievement.color];
  const Icon = achievement.icon;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-lg rounded-2xl border border-surface-border bg-surface-elevated shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Gradient Header Background */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${achievement.accentColor}18, ${achievement.accentColor}06, transparent)`,
          }}
        />

        {/* Header */}
        <div className={`relative p-6 ${colors.detailBg}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${colors.iconBg} flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">
                  {achievement.title}
                </h3>
                <div className="flex gap-2 mt-1.5">
                  {achievement.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${colors.tagBg} ${colors.tagText} border ${colors.border}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Enhanced close button with hover effects */}
            <motion.button
              onClick={onClose}
              className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-surface-border bg-surface text-text-muted hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 hover:shadow-[0_0_12px_rgba(239,68,68,0.15)] transition-all duration-300 cursor-pointer group"
              aria-label="Close"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
            </motion.button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed">
            {achievement.description}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" />

          {/* Metrics */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className={`w-4 h-4 ${colors.detailAccent}`} />
              <h4 className="text-sm font-semibold text-text-primary">Key Metrics</h4>
            </div>
            <div className="space-y-2">
              {achievement.details.metrics.map((metric, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle className={`w-4 h-4 ${colors.detailAccent} shrink-0 mt-0.5`} />
                  <span className="text-sm text-text-secondary">{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" />

          {/* Impact */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className={`w-4 h-4 ${colors.detailAccent}`} />
              <h4 className="text-sm font-semibold text-text-primary">Business Impact</h4>
            </div>
            <div className="space-y-2">
              {achievement.details.impact.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${colors.detailAccent} shrink-0 mt-1.5`} />
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" />

          {/* Skills */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Skills Demonstrated</h4>
            <div className="flex flex-wrap gap-2">
              {achievement.details.skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${colors.tagBg} ${colors.tagText} border ${colors.border} tag-pill`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-surface-border bg-surface/50">
          <button
            onClick={onClose}
            className="w-full text-center text-xs text-text-muted hover:text-text-secondary transition-colors duration-200 cursor-pointer"
          >
            Press <kbd className="px-1.5 py-0.5 mx-0.5 text-[10px] font-mono rounded border border-surface-border bg-surface">Esc</kbd> or click to close this dialog
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [selectedProject, setSelectedProject] = useState<Achievement | null>(null);

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background aurora-bg"
      >
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

        {/* Decorative blur orbs */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 pointer-events-none blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 -right-48 w-80 h-80 rounded-full opacity-15 pointer-events-none blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.25), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 left-1/3 w-72 h-72 rounded-full opacity-10 pointer-events-none blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(52,211,153,0.2), transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={headerVariants}
          >
            {/* Animated decorative accent line */}
            <motion.div
              className="mx-auto mb-6 h-[3px] w-20 rounded-full origin-center"
              style={{
                background: "linear-gradient(90deg, #10b981, #d4af37, #10b981)",
                backgroundSize: "200% 100%",
              }}
              variants={accentLineVariants}
            />

            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full badge-glow text-white"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 40%, #d4af37 100%)",
              }}
            >
              Key Achievements
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Professional{" "}
              <span className="text-gradient-green">Highlights</span>
            </h2>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-text-secondary leading-relaxed">
              A track record of driving operational excellence through strategic
              initiatives, team leadership, and a relentless commitment to quality
              across every facet of business operations.
            </p>
          </motion.div>

          {/* Summary Stats Bar */}
          <motion.div
            className="mb-12 glass-card rounded-2xl p-5"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={statsBarVariants}
          >
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
            >
              {summaryStats.map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="flex items-center gap-2.5"
                    variants={statsItemVariants}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${stat.accent}20, ${stat.accent}10)`,
                        border: `1px solid ${stat.accent}30`,
                      }}
                    >
                      <StatIcon
                        className="w-4 h-4"
                        style={{ color: stat.accent }}
                      />
                    </div>
                    <span className="text-sm font-medium text-text-secondary">
                      {stat.label}
                    </span>
                    {i < summaryStats.length - 1 && (
                      <div className="hidden sm:block w-px h-5 bg-surface-border ml-2" />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Achievement Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              const colors = colorClasses[achievement.color];
              return (
                <motion.div
                  key={achievement.id}
                  className={`card-shine glow-border-hover card-3d-hover group rounded-2xl border border-surface-border bg-surface-elevated p-6 flex flex-col gap-5 transition-all duration-300 cursor-pointer border-l-4 ${colors.borderLeft} ${colors.glow}`}
                  variants={cardVariants}
                  onClick={() => setSelectedProject(achievement)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg transition-all duration-300 hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${achievement.accentColor}cc, ${achievement.accentColor})`,
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 flex-1">
                    <h3 className="text-lg font-semibold text-text-primary leading-snug">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Tags + View Details (always visible) */}
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {achievement.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 text-xs font-medium rounded-full ${colors.tagBg} ${colors.tagText} border ${colors.border} tag-pill`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs font-medium ${colors.detailAccent} group-hover:gap-2.5 transition-all duration-300`}>
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            achievement={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
