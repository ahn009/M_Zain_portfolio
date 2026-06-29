'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Briefcase,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  Award,
  MapPin,
  TrendingUp,
  Star,
  Trophy,
  Users,
  Heart,
  Flame,
  Zap,
  ChevronDown,
} from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ExperienceEntry {
  id: number
  title: string
  company: string
  location: string
  period: string
  badge: string
  badgeColor: 'green' | 'gold'
  bullets: string[]
}

const experiences: ExperienceEntry[] = [
  {
    id: 1,
    title: 'Assistant Manager',
    company: 'Sweet Cream Pakistan',
    location: 'Karachi, Pakistan',
    period: 'January 2025 - Present',
    badge: 'Current Role',
    badgeColor: 'green',
    bullets: [
      'Oversee daily F&B production operations, shift scheduling, and workforce performance management across multiple operational shifts',
      'Enforce quality control standards across all production and service touchpoints, maintaining 95%+ quality compliance and client satisfaction ratings',
      'Manage end-to-end inventory control, procurement coordination, and supplier relationship management to ensure 99%+ product availability and minimize supply chain disruptions',
      'Oversee daily financial reconciliation, P&L tracking, and revenue management reporting to support branch-level financial performance',
      'Develop and implement SOPs for cross-functional teams, conducting training programs that enhanced operational efficiency and reduced onboarding time by 40%',
      'Drive operational excellence through cost optimization, production workflow improvements, and waste reduction strategies contributing to branch profitability',
    ],
  },
  {
    id: 2,
    title: 'Operations & Production Team Member',
    company: 'Sweet Cream Pakistan',
    location: 'Karachi, Pakistan',
    period: '2023 - January 2025',
    badge: '4 Merit-Based Promotions',
    badgeColor: 'gold',
    bullets: [
      'Executed cross-functional operational responsibilities including production floor coordination, POS operations, quality assurance, and service delivery',
      'Maintained rigorous QC protocols across production workflows, ensuring product consistency, freshness standards, and compliance with food safety SOPs',
      'Managed high-volume production scheduling and order fulfillment during peak operational periods, maintaining accuracy and service level agreements',
      'Adhered to comprehensive hygiene and health compliance protocols for safe food handling',
      'Earned four merit-based promotions in 18 months — from entry-level to Assistant Manager — demonstrating exceptional operational capability and leadership potential',
    ],
  },
]

const progressionSteps = [
  { label: 'Operations Trainee', date: '2023', icon: Star },
  { label: 'Cashier & POS Operator', date: '2023', icon: Briefcase },
  { label: 'Shift Coordinator', date: '2024', icon: TrendingUp },
  { label: 'Team Lead', date: '2024', icon: Users },
  { label: 'Assistant Manager', date: '2025', icon: Award },
]

const keyAchievements = [
  {
    icon: Trophy,
    value: '4',
    suffix: '',
    label: 'Promotions in 18 Months',
    description: 'Rapid merit-based advancement',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Heart,
    value: '95',
    suffix: '%+',
    label: 'Customer Satisfaction',
    description: 'Consistently rated top performer',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
  },
  {
    icon: Users,
    value: '10',
    suffix: '+',
    label: 'Team Members Trained',
    description: 'Mentoring & development',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Flame,
    value: '100',
    suffix: '%',
    label: 'Dedication',
    description: 'First in, last out mentality',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const badgeClasses: Record<'green' | 'gold', string> = {
  green: 'badge-gradient-green text-emerald-400',
  gold: 'badge-gradient-gold text-amber-400',
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-center mb-16 relative pt-8 section-accent-line-animated"
    >
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 badge-glow">
        <Briefcase className="w-4 h-4" />
        Career Journey
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
        Work <span className="text-gradient-green">Experience</span>
      </h2>
      <p className="mt-3 text-text-secondary max-w-xl mx-auto text-sm md:text-base">
        A track record of rapid growth, hands-on leadership, and unwavering commitment to excellence.
      </p>
    </motion.div>
  )
}

function TimelineEntry({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.15 }}
      className="relative flex items-start gap-6 md:gap-0"
    >
      {/* Timeline dot + line — desktop */}
      <div className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2 z-10">
        <div className="w-4 h-4 rounded-full bg-emerald-500 animate-timeline-dot-pulse ring-4 ring-background" />
        {index < experiences.length - 1 && (
          <div
            className="w-0.5 flex-1 mt-2"
            style={{
              height: 'calc(100% + 1.5rem)',
              background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.6), rgba(212, 175, 55, 0.4), rgba(16, 185, 129, 0.1))',
            }}
          />
        )}
      </div>

      {/* Timeline dot + line — mobile */}
      <div className="flex md:hidden flex-col items-center z-10 absolute left-[9px] top-6">
        <div className="w-4 h-4 rounded-full bg-emerald-500 animate-timeline-dot-pulse ring-4 ring-background" />
        {index < experiences.length - 1 && (
          <div
            className="w-0.5 absolute top-5"
            style={{
              height: 'calc(100% + 1.5rem)',
              background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.6), rgba(212, 175, 55, 0.4), rgba(16, 185, 129, 0.1))',
            }}
          />
        )}
      </div>

      {/* Content card — desktop */}
      <div
        className={`hidden md:block w-[calc(50%-2.5rem)] ${
          isLeft ? 'mr-auto pr-8 text-right' : 'ml-auto pl-8'
        }`}
      >
        <ExperienceCard entry={entry} align={isLeft ? 'right' : 'left'} />
      </div>

      {/* Content card — mobile */}
      <div className="md:hidden pl-10 w-full">
        <ExperienceCard entry={entry} align="left" />
      </div>
    </motion.div>
  )
}

function ExperienceCard({
  entry,
  align,
}: {
  entry: ExperienceEntry
  align: 'left' | 'right'
}) {
  return (
    <div className="group rounded-xl border border-surface-border bg-surface-elevated p-5 md:p-6 card-hover card-gradient-hover glow-border-hover relative overflow-hidden">
      {/* Top row: badge + period */}
      <div className={`flex flex-wrap items-center gap-2 mb-3 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClasses[entry.badgeColor]}`}>
          {entry.badgeColor === 'green' ? <ArrowUpRight className="w-3 h-3" /> : <Award className="w-3 h-3" />}
          {entry.badge}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-500/80">
          <Calendar className="w-3 h-3" />
          {entry.period}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-1 flex items-center gap-2">
        {entry.title}
      </h3>

      {/* Company + location */}
      <p className="text-sm text-amber-500 font-medium mb-4 flex items-center gap-1.5 flex-wrap">
        <Briefcase className="w-3.5 h-3.5 shrink-0" />
        {entry.company}
        <MapPin className="w-3 h-3 ml-2 shrink-0 text-text-muted" />
        <span className="text-text-muted">{entry.location}</span>
      </p>

      {/* Bullet list */}
      <ul className={`space-y-2 text-sm text-text-secondary leading-relaxed ${align === 'right' ? 'text-right' : 'text-left'}`}>
        {entry.bullets.map((bullet, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="flex items-start gap-2"
          >
            {align === 'right' ? (
              <>
                <span className="shrink-0 mt-1">{bullet}</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5 rotate-180" />
              </>
            ) : (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

function KeyAchievements() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-20"
    >
      <div className="text-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-text-primary flex items-center justify-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Key <span className="text-gradient-gold">Achievements</span>
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Numbers that reflect dedication and results
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {keyAchievements.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="glass-stat-card rounded-xl p-5 md:p-6 text-center relative overflow-hidden group"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5" />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-11 h-11 rounded-lg ${stat.bgColor} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>

                {/* Number with counter */}
                <div className="text-2xl md:text-3xl font-bold text-text-primary mb-1 counter-glow-animate">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-xs md:text-sm font-semibold text-text-primary/80 mb-0.5">
                  {stat.label}
                </p>

                {/* Description */}
                <p className="text-[11px] text-text-muted">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

function CareerProgression() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-20"
    >
      <div className="text-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-text-primary flex items-center justify-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          Career <span className="text-gradient-gold">Progression</span>
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Rapid advancement through dedication and consistent performance
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Connecting gradient line — desktop (horizontal) */}
        <div
          className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-0.5 -translate-y-1/2 rounded-full"
          style={{
            background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.4), rgba(212, 175, 55, 0.3))',
          }}
        />

        {/* Connecting gradient line — mobile (vertical) */}
        <div
          className="md:hidden absolute left-1/2 top-[12%] bottom-[12%] w-0.5 -translate-x-1/2 rounded-full"
          style={{
            background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.4), rgba(212, 175, 55, 0.3))',
          }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4 relative">
          {progressionSteps.map((step, i) => {
            const Icon = step.icon
            const isLast = i === progressionSteps.length - 1

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="flex md:flex-col items-center md:items-center gap-3 md:gap-2 md:text-center relative z-10 w-full md:w-auto"
              >
                {/* Animated arrow/chevron between steps — mobile */}
                {i > 0 && (
                  <div className="md:hidden flex items-center pl-2.5">
                    <div className="w-4 h-4 flex items-start justify-center">
                      <ChevronDown className="w-4 h-4 text-emerald-400/60 animate-chevron-slide" />
                    </div>
                  </div>
                )}

                {/* Animated arrow/chevron between steps — desktop */}
                {i > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.12 + 0.2 }}
                    className="hidden md:flex items-center absolute -left-10 top-1/2 -translate-y-1/2"
                  >
                    <ChevronRight className="w-4 h-4 text-emerald-400/50 animate-chevron-slide" />
                  </motion.div>
                )}

                {/* Icon circle with number indicator */}
                <div
                  className={`shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative ${
                    isLast
                      ? 'bg-emerald-500/20 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.25),0_0_40px_rgba(16,185,129,0.1)] animate-glow-pulse'
                      : 'bg-surface border-surface-border hover:border-emerald-500/30 hover:bg-emerald-500/5'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isLast ? 'text-emerald-400' : 'text-text-muted'
                    }`}
                  />
                  {/* Step number */}
                  <span
                    className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center border border-background ${
                      isLast
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'bg-surface-elevated text-text-muted border-surface-border'
                    }`}
                  >
                    {i + 1}
                  </span>
                </div>

                <div className="pl-1 md:pl-0">
                  <p
                    className={`text-sm font-semibold glow-text-hover cursor-default ${
                      isLast ? 'text-emerald-400' : 'text-text-primary/80'
                    }`}
                  >
                    {step.label}
                    {isLast && (
                      <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-text-muted">{step.date}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden aurora-bg"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid pointer-events-none z-0" />
      <div className="absolute inset-0 bg-dots-pattern pointer-events-none z-0 opacity-30" />

      {/* Ambient blur orbs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/[0.06] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-emerald-500/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/[0.04] blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeader />

        {/* Timeline */}
        <div className="relative space-y-10 md:space-y-14">
          {experiences.map((entry, i) => (
            <TimelineEntry key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        {/* Key Achievements */}
        <KeyAchievements />

        {/* Career Progression */}
        <CareerProgression />
      </div>
    </section>
  )
}
