import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Zain – Assistant Manager | Food & Dairy Industry Professional",
  description:
    "Portfolio of Muhammad Zain, an Assistant Manager in the food and dairy industry with 1.5 years of progressive experience. Specialized in store operations, inventory management, team leadership, and customer service excellence.",
  keywords: [
    "Muhammad Zain",
    "Assistant Manager",
    "Food Industry",
    "Dairy Industry",
    "Operations Management",
    "Store Operations",
    "Customer Service",
    "Inventory Management",
    "Karachi Pakistan",
    "Sweet Cream Pakistan",
  ],
  authors: [{ name: "Muhammad Zain" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Muhammad Zain – Assistant Manager | Food & Dairy Industry",
    description:
      "Dedicated operations professional with 1.5 years of progressive experience in food and dairy. Rapid promotion from entry-level to Assistant Manager.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Zain – Assistant Manager",
    description:
      "Operations professional specializing in store operations, inventory management, and team leadership in the food and dairy industry.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Zain",
              url: "https://muhammadzain.vercel.app",
              email: "muhammazain84@gmail.com",
              jobTitle: "Assistant Manager",
              description:
                "Dedicated operations professional with 1.5 years of progressive experience in the food and dairy industry. Specialized in store operations, inventory management, and team leadership.",
              worksFor: {
                "@type": "Organization",
                name: "Sweet Cream Pakistan",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Karachi",
                addressCountry: "PK",
              },
              knowsAbout: [
                "Store Operations",
                "Customer Service",
                "Inventory Management",
                "Cash Handling",
                "Team Leadership",
                "Food Industry",
                "Dairy Industry",
                "Retail Management",
                "Social Media Management",
              ],
            }),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
