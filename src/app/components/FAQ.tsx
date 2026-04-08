"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* ──────────────────────────────────────────────
   FAQ data
   ────────────────────────────────────────────── */
const faqs = [
  {
    question: "What makes you different from other candidates?",
    answer:
      "My rapid progression from entry-level to Assistant Manager in just 16 months demonstrates exceptional adaptability, leadership potential, and commitment to excellence. I bring hands-on experience across multiple departments and a proven track record of exceeding expectations.",
  },
  {
    question: "Are you open to relocation or international opportunities?",
    answer:
      "Absolutely! I'm open to international opportunities and relocation. I believe diverse work environments foster growth, and I'm eager to bring my skills and dedication to new markets and cultures.",
  },
  {
    question: "What is your management style?",
    answer:
      "I believe in leading by example. My approach combines hands-on involvement with empowering team members. I focus on clear communication, continuous training, and creating an environment where everyone feels valued and motivated to contribute their best.",
  },
  {
    question: "How do you handle pressure and challenging situations?",
    answer:
      "Through my experience managing high-volume operations during peak hours, I've developed strong pressure management skills. I prioritize tasks, maintain calm under pressure, and focus on finding practical solutions efficiently.",
  },
  {
    question: "What are your career goals?",
    answer:
      "I aim to grow into senior management roles within the retail and food industry. I'm passionate about operational excellence and want to lead larger teams while implementing innovative business strategies that drive measurable results.",
  },
  {
    question: "Can you describe a time you improved a process?",
    answer:
      "I identified inventory management inefficiencies that were causing product shortages. By implementing a systematic tracking approach and building stronger supplier relationships, I reduced stock waste by 30% and improved product availability to 99%+.",
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
      staggerChildren: 0.08,
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

/* ──────────────────────────────────────────────
   FAQ component
   ────────────────────────────────────────────── */
export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-secondary"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto text-sm md:text-base">
            Everything you need to know about my experience, approach, and career
            aspirations.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="rounded-xl border border-surface-border bg-surface-elevated px-6 glow-border-hover transition-all duration-300 data-[state=open]:border-emerald-500/30 data-[state=open]:shadow-lg data-[state=open]:shadow-emerald-500/5"
                >
                  <AccordionTrigger className="text-left text-sm md:text-base font-medium text-text-primary py-5 hover:no-underline hover:text-emerald-400 transition-colors duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-text-secondary pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
