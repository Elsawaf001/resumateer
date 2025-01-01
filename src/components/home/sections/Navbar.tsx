"use client"
import Image from "next/image";
import logoImage from "@/assets/images/logo.svg"
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "motion/react";
import Logo from "@/components/Logo";
import InfoItems from "@/components/InfoItems";
import MobileInfoItems from "@/components/MobileInfoItems";


const navLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#integrations" },
    { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>

            <section className="py-4 lg:py-8 fixed w-full top-0 z-50">
                <div className="container max-w-5xl">
                    <div className="border border-white/15 rounded-[27px] md:rounded-full bg-neutral-950/70 backdrop-blur">

                        <div className="grid grid-cols-2 lg:grid-cols-3  p-2 items-center px-4 md:pr-2">
                            <div>
                                <Logo />
                            </div>


                            <div className="lg:flex justify-center items-center hidden">
                                <nav className="flex gap-6 font-medium">
                                    {navLinks.map((link) => (
                                        <a href={link.href} key={link.label}>{link.label}</a>
                                    ))}
                                </nav>
                            </div>


                            <div className="flex justify-end gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="feather feather-menu md:hidden">
                                    <line x1="3" y1="6" x2="21" y2="6" className={twMerge("origin-left transition", isMenuOpen && "rotate-45 -translate-y-1")}></line>
                                    <line x1="3" y1="12" x2="21" y2="12" className={twMerge("origin-left transition", isMenuOpen && "opacity-0")}></line>

                                    <line x1="3" y1="18" x2="21" y2="18" className={twMerge("origin-left transition", isMenuOpen && "-rotate-45 translate-y-1")}></line>
                                </svg>
                                <InfoItems/>
                            </div>

                        </div>


                        <AnimatePresence>


                            {isMenuOpen && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden">

                                    <div className="flex flex-col items-center gap-4 py-4 md:hidden">
                                        {navLinks.map((link) => (
                                            <a href={link.href} key={link.label} className="">{link.label}</a>
                                        ))}

                                       <MobileInfoItems/>
                                    </div>


                                </motion.div >


                            )}
                        </AnimatePresence>





                    </div>
                </div>
            </section>
            <div className="pb-[86px] md:pb-[96px] lg:pb-[130px]"></div>
        </>
    );
}
