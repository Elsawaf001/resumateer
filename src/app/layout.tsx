import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'

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
  description: "Resumateer is Ai Powered Resume Builder For Professinals",
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
          className={`${inter.variable} font-sans antialiased bg-neutral-950 text-white`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
