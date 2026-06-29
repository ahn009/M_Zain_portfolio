'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

/* ────────────────────────────────────────────
   Testimonial data
   ──────────────────────────────────────────── */
const testimonials = [
  {
    name: 'Ahmed Khan',
    role: 'Branch Manager',
    company: 'Sweet Cream',
    initials: 'AK',
    stars: 5,
    quote:
      'Muhammad Zain is one of the most dedicated professionals I\'ve had the pleasure of working with. His attention to detail and ability to lead teams is truly exceptional. He consistently goes above and beyond.',
    gradient: 'from-emerald-500 to-emerald-700',
  },
  {
    name: 'Sarah Williams',
    role: 'Operations Director',
    company: null,
    initials: 'SW',
    stars: 5,
    quote:
      'Zain\'s rapid growth from entry-level to Assistant Manager speaks volumes about his work ethic and capability. He has a natural talent for operations management.',
    gradient: 'from-amber-500 to-amber-700',
  },
  {
    name: 'Omar Farooq',
    role: 'Senior Team Lead',
    company: null,
    initials: 'OF',
    stars: 4,
    quote:
      'Working under Zain\'s leadership has been an incredible experience. He\'s supportive, knowledgeable, and always pushes the team to achieve their best.',
    gradient: 'from-emerald-400 to-teal-600',
  },
]

/* ────────────────────────────────────────────
   Star Rating
   ──────────────────────────────────────────── */
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < count
              ? 'text-amber-400 fill-amber-400'
              : 'text-text-muted/30 fill-none'
          }`}
        />
      ))}
    </div>
  )
}

/* ────────────────────────────────────────────
   Testimonial Card
   ──────────────────────────────────────────── */
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: 0.15 * index, ease: 'easeOut' }}
      className="relative"
    >
      <div className="relative rounded-xl border border-surface-border bg-surface-elevated/60 backdrop-blur-sm p-6 card-hover h-full flex flex-col card-gradient-hover">
        {/* Quote icon decoration */}
        <Quote className="w-8 h-8 text-emerald-500/15 mb-4 shrink-0" />

        {/* Quote text */}
        <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Star rating */}
        <StarRating count={testimonial.stars} />

        {/* Author info */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-surface-border">
          {/* Avatar with initials */}
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shrink-0 shadow-lg`}
          >
            <span className="text-sm font-bold text-white">
              {testimonial.initials}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">
              {testimonial.name}
            </p>
            <p className="text-xs text-text-muted truncate">
              {testimonial.role}
              {testimonial.company ? ` at ${testimonial.company}` : ''}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────
   Testimonials Section (exported)
   ──────────────────────────────────────────── */
export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section className="relative py-20 md:py-28 bg-secondary aurora-bg">
      {/* Top fade edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={
            headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
          }
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            What People Say
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm md:text-base">
            Hear from the colleagues and managers who have worked alongside me
          </p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade edge */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </section>
  )
}
