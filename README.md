# Muhammad Zain — Personal Portfolio

A modern, animated personal portfolio website built with **Next.js 16**, **React 19**, and **TypeScript** — designed to showcase professional experience and attract international job opportunities.

**Live candidate:** Muhammad Zain | Assistant Manager & Operations Professional  
**Contact:** muhammazain84@gmail.com | Karachi, Pakistan

---

## About the Project

This portfolio presents Muhammad Zain's professional background in retail and operations management. Built with a polished dark UI, smooth page transitions, and interactive animations, it is designed to make a strong first impression with international recruiters.

**Key highlights shown:**
- 1.5+ years of progressive experience in food & dairy retail
- 3 internal promotions in 16 months (Entry Level → Assistant Manager)
- 95%+ customer satisfaction rating
- Mentored 10+ team members
- Open to international opportunities

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (standalone) | Framework & SSR |
| React 19 | UI library |
| TypeScript 5 | Type safety |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations & transitions |
| Shadcn/ui + Radix UI | Accessible UI components |
| Prisma | Database ORM |
| NextAuth.js | Authentication |
| next-intl | Internationalization |
| Zustand | State management |
| TanStack Query | Server state |
| Recharts | Data visualization |
| React Hook Form + Zod | Forms & validation |
| Lucide React | Icons |

---

## Features

- **Animated Hero** — typing effect cycling through roles, cursor particle trail, avatar with rotating gradient border
- **Command Palette** — `Ctrl+K` / `Cmd+K` quick navigation
- **Scroll Progress Bar** — visual reading indicator
- **Animated Counters** — stats that count up on scroll into view
- **Experience Timeline** — alternating left/right career timeline with career progression steps
- **Skills Radar** — visual skills breakdown
- **Testimonials** — social proof section
- **Why Hire Me** — value proposition section
- **FAQ** — common recruiter questions answered
- **Contact Form** — direct email contact
- **WhatsApp Button** — floating quick-contact button
- **Resume Download** — one-click PDF resume download
- **Preloader** — branded loading screen on first visit
- **Hash-based Routing** — browser back/forward navigation support
- **Fully Responsive** — mobile, tablet, and desktop layouts

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd M_Zain_portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

The project uses Next.js standalone output, making it lightweight and easy to deploy anywhere.

---

## Project Structure

```
M_Zain_portfolio/
├── public/
│   ├── avatar.png          # Profile photo
│   ├── resume.pdf          # Downloadable resume
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── components/     # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── SkillsRadar.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── WhyHireMe.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Preloader.tsx
│   │   │   ├── CommandPalette.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   ├── WhatsAppButton.tsx
│   │   │   └── AnimatedCounter.tsx
│   │   ├── api/            # API routes (contact form)
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main entry with hash routing
│   ├── components/         # Shared UI components (shadcn)
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utilities
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Customization

To update content for a different candidate:

1. **Profile photo** — replace `public/avatar.png`
2. **Resume** — replace `public/resume.pdf`
3. **Personal info & roles** — edit `src/app/components/Hero.tsx`
4. **About, education, certifications** — edit `src/app/components/About.tsx`
5. **Work history** — edit `src/app/components/Experience.tsx`
6. **Projects** — edit `src/app/components/Projects.tsx`
7. **Contact details** — edit `src/app/components/Contact.tsx`

---

## Deployment

This project is configured for **standalone output** and can be deployed to:

- **Vercel** — push to GitHub and connect via [vercel.com](https://vercel.com) (zero config)
- **VPS / Docker** — use the `.next/standalone` folder after `npm run build`
- **Netlify** — connect GitHub repo, set build command to `npm run build`

For Vercel (recommended — easiest for international visibility):

```bash
npm install -g vercel
vercel
```

---

## License

This project is private and personal. All content (profile, resume, experience details) belongs to Muhammad Zain. The codebase may be reused as a template with attribution.
