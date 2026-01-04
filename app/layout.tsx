import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Bar Maizel | Full-Stack Developer & Creative Technologist",
  description:
    "Premium portfolio showcasing innovative web applications, SaaS products, and creative development solutions. Specializing in Next.js, React, and modern web technologies.",
  keywords: [
    "Full-Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "SaaS",
    "Portfolio",
  ],
  authors: [{ name: "Bar Maizel" }],
  openGraph: {
    title: "Bar Maizel | Full-Stack Developer",
    description: "Crafting premium digital experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-syne), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
