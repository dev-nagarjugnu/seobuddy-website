// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // 1. Import the Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEOBuddy - Skyrocket Your Rankings",
  description: "Data-driven SEO strategies for measurable growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer /> {/* 2. Add the Footer here */}
      </body>
    </html>
  );
}