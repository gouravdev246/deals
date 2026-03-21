import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppWrapper } from "./context/AppContext";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Analytics } from "@vercel/analytics/next"

import MobileTabBar from "@/components/MobileTabBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "LPU Deals – Buy & Sell Second-Hand Products at LPU Campus",
    template: "%s | LPU Deals",
  },
  description:
    "LPU Deals is the #1 student marketplace at Lovely Professional University. Buy and sell second-hand books, electronics, lab coats, cycles, and more. Safe, fast, and trusted campus deals among verified LPU students.",
  keywords: [
    "LPU Deals",
    "lpudeals",
    "LPU marketplace",
    "LPU second hand products",
    "buy sell LPU",
    "LPU campus deals",
    "second hand books LPU",
    "LPU student marketplace",
    "Lovely Professional University deals",
    "LPU products",
    "used products LPU",
    "LPU buy sell",
    "college marketplace India",
    "student deals LPU",
    "LPU electronics",
    "LPU lab coat",
    "LPU cycle",
  ],
  authors: [
    { name: "Gourav Sarkar" },
    { name: "Shashank Shekhar" },
  ],
  creator: "Gourav Sarkar",
  publisher: "LPU Deals",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://lpudeals.shop",
    siteName: "LPU Deals",
    title: "LPU Deals – Buy & Sell Second-Hand Products at LPU Campus",
    description:
      "The trusted student marketplace at Lovely Professional University. Buy & sell books, electronics, lab coats, cycles & more among verified LPU students.",
    images: [
      {
        url: "/iconlogo.png",
        width: 512,
        height: 512,
        alt: "LPU Deals Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LPU Deals – Campus Marketplace for LPU Students",
    description:
      "Buy and sell second-hand products at Lovely Professional University. Trusted deals among verified students.",
    images: ["/iconlogo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/iconlogo.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  metadataBase: new URL("https://lpudeals.shop"),
  alternates: {
    canonical: "/",
  },
  category: "marketplace",
};

// JSON-LD Structured Data for Google Rich Results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LPU Deals",
  url: "https://lpudeals.shop",
  description:
    "The #1 student marketplace at Lovely Professional University. Buy and sell second-hand books, electronics, lab coats, cycles, and more.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://lpudeals.shop/products?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AppWrapper>
          <ProtectedRoute>
            <Navbar />
            {children}
            <MobileTabBar />
          </ProtectedRoute>
        </AppWrapper>
        <Analytics/>
      </body>
    </html>
  );
}

