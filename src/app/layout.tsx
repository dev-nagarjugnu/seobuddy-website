// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/AuthProvider";
import TawkToWidget from '@/components/TawkToWidget';
import ErrorBoundary from '@/components/ErrorBoundary';
import StructuredData from '@/components/StructuredData';
import Canonical from '@/components/Canonical';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEOBuddy - Skyrocket Your Rankings",
  description: "Data-driven SEO strategies for measurable growth.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <Header />
            <div style={{ height: '4rem' }} />
            {children}
            <Footer />
            <StructuredData />
            <Canonical />
            <ErrorBoundary>
              <TawkToWidget 
                widgetId="688c60ee932a8a1930b1363f/1j1i5l9fu"
                hideOnPages={['/dashboard', '/user-dashboard']}
              />
            </ErrorBoundary>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}