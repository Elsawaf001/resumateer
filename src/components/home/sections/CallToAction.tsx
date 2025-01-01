"use client"
import { motion, useAnimate } from "framer-motion"
import { AnimationPlaybackControls } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function CallToAction() {
    const [isHovered, setIsHovered] = useState(false);
    const animation = useRef<AnimationPlaybackControls>();
    const [scope, animate] = useAnimate();
    useEffect(() => {
        animation.current = animate(scope.current, { x: "-50%" }, { duration: 30, ease: "linear", repeat: Infinity });
        // animation.current.speed = 0.5
    }, [])
    useEffect(() => {
        if (animation.current) {
            if (isHovered)
                animation.current.speed = 0.5
            else
                animation.current.speed = 1
        }
    }, [isHovered])
    return (
        <section className="py-24 ">
            <div className="overflow-x-clip p-4 flex">
                <motion.div
                    ref={scope}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="flex flex-none text-7xl md:text-8xl font-medium gap-16 pr-16 cursor-pointer">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-16 group">
                            <span className="text-lime-400 text-7xl md:text-8xl">&#10038;</span>
                            <span className="group-hover:text-lime-400">Try it for free</span>
                        </div>
                    ))}
                </motion.div>

            </div>

        </section>
    );
}
