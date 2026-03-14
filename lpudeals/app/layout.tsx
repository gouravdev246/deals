import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppWrapper } from "./context/AppContext";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LPU Deals | Campus Marketplace",
  description: "Exclusive second-hand marketplace for Lovely Professional University students.",
  icons: {
    icon: "/iconlogo.png",
  }
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
      </head>
      <body className={`${inter.className} antialiased`}>
        <AppWrapper>
          <ProtectedRoute>
            <Navbar />
            {children}
          </ProtectedRoute>
        </AppWrapper>
      </body>
    </html>
  );
}
