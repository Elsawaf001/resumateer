import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from '@vercel/analytics/next';

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});



export const metadata: Metadata = {
  title: {
    template: "%s - Resumateer",
    absolute: "Resumateer",
  },
  description: "Resumateer offers AI-powered tools for building professional resumes, generating tailored cover letters, and optimizing applications to pass ATS systems.",
  keywords: "resume builder, AI resume tools, cover letter generator, ATS optimization, job application, salary report generator, professional CV",
  authors: [{ name: "Resumateer", url: "https://www.resumateer.com" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Resumateer - AI-Powered Resume & Job Application Tools",
    description: "Enhance your career with Resumateer. Build resumes, tailor cover letters, and generate salary insights effortlessly.",
    url: "https://www.resumateer.com",
    siteName: "Resumateer",
    images: [
      {
        url: "https://www.resumateer.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resumateer - AI-Powered Resume & Job Application Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resumateer - AI-Powered Resume & Job Application Tools",
    description: "Build professional resumes, create custom cover letters, and optimize your applications with Resumateer's AI tools.",
    images: ["https://www.resumateer.com/images/twitter-card.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>


      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable}  antialiased bg-black text-white`}
        >
             
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <Analytics />
            <Toaster/>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
