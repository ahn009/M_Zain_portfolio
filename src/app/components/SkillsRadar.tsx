"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────
   Skill data
   ────────────────────────────────────────────── */
const skills = [
  { label: "Operations", value: 92, color: "#10b981" },
  { label: "Leadership", value: 88, color: "#34d399" },
  { label: "Service Excellence", value: 95, color: "#d4af37" },
  { label: "Inventory", value: 85, color: "#10b981" },
  { label: "Technical", value: 72, color: "#34d399" },
  { label: "Digital Marketing", value: 68, color: "#d4af37" },
];

const GRID_LEVELS = 4;

/* ──────────────────────────────────────────────
   Hexagonal geometry helpers
   ────────────────────────────────────────────── */
function polarToCartesian(
  angle: number,
  radius: number,
  cx: number,
  cy: number
) {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

function buildHexPoints(
  radius: number,
  cx: number,
  cy: number,
  values: number[]
) {
  return values.map((val, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    const r = (val / 100) * radius;
    return polarToCartesian(angle, r, cx, cy);
  });
}

function pointsToString(pts: { x: number; y: number }[]) {
  return pts.map((p) => `${p.x},${p.y}`).join(" ");
}

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

/* ──────────────────────────────────────────────
   SkillsRadar component
   ────────────────────────────────────────────── */
export default function SkillsRadar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  /* SVG dimensions */
  const size = 340;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 40;

  /* Build grid polygons (4 levels) */
  const gridLevels = Array.from({ length: GRID_LEVELS }, (_, i) => {
    const r = ((i + 1) / GRID_LEVELS) * maxRadius;
    const pts = Array.from({ length: 6 }, (_, j) => {
      const angle = (Math.PI / 3) * j - Math.PI / 2;
      return polarToCartesian(angle, r, cx, cy);
    });
    return { radius: r, points: pointsToString(pts) };
  });

  /* Build axis lines */
  const axes = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    const end = polarToCartesian(angle, maxRadius, cx, cy);
    const label = polarToCartesian(angle, maxRadius + 28, cx, cy);
    return { end, label, angle };
  });

  /* Build data polygon */
  const dataPoints = buildHexPoints(
    maxRadius,
    cx,
    cy,
    skills.map((s) => s.value)
  );

  /* Animate from center (0%) to actual values */
  const animatedDataPoints = isInView
    ? dataPoints
    : dataPoints.map((p) => ({ x: cx, y: cy }));

  return (
    <div ref={sectionRef} className="w-full max-w-sm md:max-w-md mx-auto">
      {/* Section Header */}
      <motion.div
        className="text-center mb-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={headerVariants}
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
          </svg>
          Proficiency Overview
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          Skills <span className="text-gradient">Radar</span>
        </h2>
      </motion.div>

      {/* Radar Chart */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-auto"
          role="img"
          aria-label="Skills proficiency radar chart"
        >
          <defs>
            {/* Gradient for data polygon fill */}
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0.3" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Stronger glow for data polygon */}
            <filter id="polygonGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid polygons */}
          {gridLevels.map((level, i) => (
            <polygon
              key={i}
              points={level.points}
              fill="none"
              stroke="currentColor"
              className="text-text-muted/20"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {axes.map((axis, i) => (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={axis.end.x}
              y2={axis.end.y}
              stroke="currentColor"
              className="text-text-muted/25"
              strokeWidth="1"
            />
          ))}

          {/* Data polygon (glow layer) */}
          <motion.polygon
            points={pointsToString(animatedDataPoints)}
            fill="url(#radarGradient)"
            stroke="url(#radarGradient)"
            strokeWidth="2"
            filter="url(#polygonGlow)"
            style={{
              transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Data polygon (solid layer) */}
          <motion.polygon
            points={pointsToString(animatedDataPoints)}
            fill="url(#radarGradient)"
            stroke="#10b981"
            strokeWidth="2"
            style={{
              transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Data points with color-coded dots */}
          {dataPoints.map((point, i) => (
            <motion.circle
              key={i}
              cx={animatedDataPoints[i].x}
              cy={animatedDataPoints[i].y}
              r="5"
              fill={skills[i].color}
              stroke="hsl(var(--background))"
              strokeWidth="2"
              filter="url(#glow)"
              initial={{ r: 0 }}
              animate={isInView ? { r: 5, cx: point.x, cy: point.y } : { r: 0, cx, cy }}
              transition={{
                duration: 0.8,
                delay: 0.4 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}

          {/* Center dot */}
          <circle cx={cx} cy={cy} r="3" fill="currentColor" className="text-text-muted/40" />

          {/* Axis labels */}
          {axes.map((axis, i) => {
            const textAnchor =
              axis.label.x < cx - 10 ? "end" : axis.label.x > cx + 10 ? "start" : "middle";
            const dominantBaseline =
              axis.label.y < cy - 10 ? "auto" : axis.label.y > cy + 10 ? "hanging" : "middle";
            return (
              <text
                key={i}
                x={axis.label.x}
                y={axis.label.y}
                textAnchor={textAnchor}
                dominantBaseline={dominantBaseline}
                className="text-[11px] font-medium fill-text-secondary"
              >
                {skills[i].label}
              </text>
            );
          })}
        </svg>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
      >
        {skills.map((skill, i) => (
          <motion.div
            key={skill.label}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-surface-border bg-surface-elevated/60"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.08, ease: "easeOut" }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: skill.color, boxShadow: `0 0 6px ${skill.color}40` }}
            />
            <span className="text-xs font-medium text-text-secondary truncate">
              {skill.label}
            </span>
            <span className="text-xs font-bold text-text-primary ml-auto">
              {skill.value}%
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
