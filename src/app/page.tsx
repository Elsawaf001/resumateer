import CallToAction from "@/components/home/sections/CallToAction";
import Faqs from "@/components/home/sections/Faqs";
import Features from "@/components/home/sections/Features";
import Footer from "@/components/home/sections/Footer";
import Hero from "@/components/home/sections/Hero";
import Integrations from "@/components/home/sections/Integrations";
import Introduction from "@/components/home/sections/Introduction";
import LogoTicker from "@/components/home/sections/LogoTicker";
import Navbar from "@/components/home/sections/Navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'
import React from "react";
export default async function Home() {
  const { userId } = await auth();
  
    if (userId) {
      redirect("/resumes");
    }
  
  return (
    <>
      <Navbar />
      <Hero />
      <LogoTicker />
      <Introduction />
      <Features />
      <Integrations />
      <Faqs />
      <CallToAction />
      <Footer />
    </>
  );
}
