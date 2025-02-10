"use client"
import Tag from "@/components/home/common/Tag";
import { motion , useScroll } from "framer-motion";
import { useMotionValueEvent, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const text = `Resumateer is your ultimate career companion, combining the power of advanced AI with user-friendly tools to help you craft professional resumes, tailored cover letters, and ATS-optimized CVs. Simplify your job application process and stand out to employers with precision and ease.`;
const words = text.split(" ");

export default function Introduction() {
    const scrollTarget = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({target : scrollTarget , offset : ["start end", "end end"]},) 
const [currentWord, setCurrentWord] = useState(0) ;
const wordIndex = useTransform(scrollYProgress, [0,1], [0,words.length])

useEffect(() => {
    wordIndex.on("change" , (latest)=> {
        setCurrentWord(latest)
    })
})
    return (
    <section className="py-28 lg:py-40">

        <div className="container">
            <div className="sticky top-20 md:top-28 lg:top-40">

            
            <div className="flex justify-center">
                <Tag>Introducting Resumateer</Tag>
            </div>
    
            <div className="text-4xl md:text-6xl lg:text-5xl font-medium text-center mt-10">
                <span>Your creative process deserves better .</span> {" "}
                <span >
                    {
                        words.map((word,index) => (
                            <motion.span key={index} className={twMerge("transition duration-500 text-white/15",index < currentWord && "text-white")} >{`${word} `}</motion.span>
                        ))}
                    
                    </span> 
                <span className="text-lime-400 block">that&apos;s why we built Resumateer. </span> 
            </div>

            </div>

            <div className="h-[150vh]" ref={scrollTarget}></div>

        </div>
    </section>
     ) ;
}
