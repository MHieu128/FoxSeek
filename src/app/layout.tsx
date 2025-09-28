import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FOXSEEK - Cyberpunk Search Engine",
  description: "Experience the future of search with FOXSEEK - a cyberpunk-themed search engine powered by AI. Explore the digital realm with neon aesthetics and cutting-edge technology.",
  keywords: ["FOXSEEK", "search engine", "cyberpunk", "AI search", "neon search", "digital frontier", "future search"],
  authors: [{ name: "FOXSEEK Team" }],
  openGraph: {
    title: "FOXSEEK - Cyberpunk Search Engine",
    description: "Enter the digital void with FOXSEEK - the ultimate cyberpunk search experience",
    url: "https://foxseek.com",
    siteName: "FOXSEEK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FOXSEEK - Cyberpunk Search Engine",
    description: "Experience the future of search with neon aesthetics and AI power",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
