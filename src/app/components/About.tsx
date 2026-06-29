'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  GraduationCap,
  Award,
  Languages as LanguagesIcon,
  CheckCircle,
  Star,
  BookOpen,
  Monitor,
  Coffee,
  MapPin,
  Calendar,
  Users,
} from 'lucide-react'
import Skills from './Skills'
import Testimonials from './Testimonials'
import WhyHireMe from './WhyHireMe'

/* ────────────────────────────────────────────
   Reusable fade-in-up wrapper
   ──────────────────────────────────────────── */
function FadeInUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────
   Section Header
   ──────────────────────────────────────────── */
function SectionHeader() {
  return (
    <FadeInUp className="text-center mb-16">
      <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
        About Me
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
        <span className="text-gradient">Get to Know Me</span>
      </h2>
      <p className="text-text-secondary max-w-xl mx-auto text-sm md:text-base">
        A snapshot of my education, skills, certifications, and what drives me
        to grow every day.
      </p>
    </FadeInUp>
  )
}

/* ────────────────────────────────────────────
   Professional Summary (left column)
   ──────────────────────────────────────────── */
function ProfessionalSummary() {
  return (
    <FadeInUp delay={0.15}>
      <div className="rounded-xl border border-surface-border bg-surface-elevated/60 backdrop-blur-sm p-6 md:p-8 card-hover h-full">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Star className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Professional Summary</h3>
        </div>
        <p className="text-text-secondary leading-relaxed text-sm md:text-base">
          Results-driven F&amp;B Operations &amp; Production Management
          Professional with 1.5 years of progressive hands-on experience in the
          food manufacturing and production sector. Earned 4 merit-based
          promotions from Operations Trainee to Assistant Manager in 18 months
          through consistent performance, operational excellence, and strong
          leadership capabilities across shift management, quality control, and
          SOP implementation.
        </p>
      </div>
    </FadeInUp>
  )
}

/* ────────────────────────────────────────────
   Small Detail Card
   ──────────────────────────────────────────── */
function DetailCard({
  icon: Icon,
  iconColor = 'text-emerald-400',
  iconBg = 'bg-emerald-500/10',
  label,
  children,
  delay,
}: {
  icon: React.ElementType
  iconColor?: string
  iconBg?: string
  label: string
  children: React.ReactNode
  delay: number
}) {
  return (
    <FadeInUp delay={delay}>
      <div className="rounded-xl border border-surface-border bg-surface-elevated/60 backdrop-blur-sm p-5 card-hover">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}
          >
            <Icon className={`w-[18px] h-[18px] ${iconColor}`} />
          </div>
          <h4 className="font-semibold text-sm text-text-primary">{label}</h4>
        </div>
        {children}
      </div>
    </FadeInUp>
  )
}

/* ────────────────────────────────────────────
   Education
   ──────────────────────────────────────────── */
function Education() {
  return (
    <DetailCard icon={GraduationCap} label="Education" delay={0.2}>
      <div className="space-y-2">
        <p className="font-medium text-sm text-text-primary">Intermediate (FA/FSc/ICS)</p>
        <div className="flex items-center gap-2 text-text-secondary text-xs">
          <span>TCI College, Karachi, Pakistan</span>
        </div>
        <span className="inline-block px-2.5 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
          2022 &ndash; 2024
        </span>
      </div>
    </DetailCard>
  )
}

/* ────────────────────────────────────────────
   Certifications
   ──────────────────────────────────────────── */
function Certifications() {
  const certs = [
    {
      icon: BookOpen,
      title: 'Computer Course Certification (6 Months)',
      year: '2024',
    },
    {
      icon: Monitor,
      title: 'POS System Training — Sweet Cream Pakistan',
      year: null,
    },
  ]

  return (
    <DetailCard icon={Award} label="Certifications" delay={0.3}>
      <ul className="space-y-3">
        {certs.map((cert) => (
          <li key={cert.title} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <cert.icon className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium leading-snug">{cert.title}</p>
              {cert.year && (
                <span className="text-xs text-text-secondary">
                  {cert.year}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </DetailCard>
  )
}

/* ────────────────────────────────────────────
   Languages
   ──────────────────────────────────────────── */
function Languages() {
  const langs = [
    { name: 'English', level: 'Basic to Intermediate', pct: 50 },
    { name: 'Urdu', level: 'Fluent / Native', pct: 100 },
  ]

  return (
    <DetailCard
      icon={LanguagesIcon}
      iconColor="text-amber-400"
      iconBg="bg-amber-500/10"
      label="Languages"
      delay={0.4}
    >
      <div className="space-y-3">
        {langs.map((lang) => (
          <div key={lang.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-text-primary">{lang.name}</span>
              <span className="text-xs text-text-secondary">{lang.level}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-border/60 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
              />
            </div>
          </div>
        ))}
      </div>
    </DetailCard>
  )
}

/* ────────────────────────────────────────────
   Key Strengths
   ──────────────────────────────────────────── */
function KeyStrengths() {
  const strengths = [
    'Rapid learner with exceptional adaptability',
    'Strong work ethic and professional commitment',
    'Proven track record of merit-based promotions',
    'Excellent pressure management and multitasking',
    'Comprehensive F&B production operations & quality control knowledge',
    'Strong interpersonal and leadership skills',
  ]

  return (
    <DetailCard
      icon={CheckCircle}
      iconColor="text-emerald-400"
      iconBg="bg-emerald-500/10"
      label="Key Strengths"
      delay={0.5}
    >
      <ul className="space-y-2.5">
        {strengths.map((strength, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-sm text-text-secondary leading-snug">
              {strength}
            </span>
          </li>
        ))}
      </ul>
    </DetailCard>
  )
}

/* ────────────────────────────────────────────
   About Section (exported)
   ──────────────────────────────────────────── */
export default function About() {
  return (
    <div className="relative">
      {/* About Section */}
      <section
        id="about"
        className="relative py-20 md:py-28 bg-secondary bg-grid aurora-bg"
      >
        {/* Subtle top / bottom fade edges */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <ProfessionalSummary />
            </div>

            {/* Right Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Education />
              <Certifications />
              <Languages />
              <KeyStrengths />
            </div>
          </div>

          {/* Fun Facts Ribbon */}
          <FunFacts />

        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Why Hire Me Section */}
      <WhyHireMe />

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  )
}

/* ────────────────────────────────────────────
   Fun Facts
   ──────────────────────────────────────────── */
function FunFacts() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const facts = [
    { icon: MapPin, value: 'Karachi, Pakistan', label: 'Based in', color: 'text-emerald-400' },
    { icon: Calendar, value: '18 Months', label: '4 Promotions to Manager', color: 'text-amber-400' },
    { icon: Users, value: '10+', label: 'Team Members Mentored', color: 'text-emerald-400' },
    { icon: Coffee, value: 'Daily', label: 'First One In, Last One Out', color: 'text-amber-400' },
  ]

  return (
    <motion.div
      ref={ref}
      className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {facts.map((fact, i) => {
        const Icon = fact.icon
        return (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 * i }}
            className="group flex items-center gap-3 p-3 rounded-xl border border-surface-border bg-surface-elevated/60 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-300 cursor-default"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Icon className={`w-4 h-4 ${fact.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">{fact.value}</p>
              <p className="text-xs text-text-muted truncate">{fact.label}</p>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
