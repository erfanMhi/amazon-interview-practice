import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load fonts with consistent configuration
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

// Combine font variables to avoid inconsistencies
const fontVariables = `${inter.variable} ${geistSans.variable} ${geistMono.variable}`;

export const metadata: Metadata = {
  title: 'Amazon Behavioral Interview Practice',
  description: 'Practice your Amazon behavioral interview questions with a one-minute timer to improve your STAR method responses',
  keywords: ['Amazon', 'interview', 'behavioral', 'practice', 'STAR method', 'questions'],
  authors: [{ name: 'Interview App Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${fontVariables} antialiased min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
