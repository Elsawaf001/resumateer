"use client"
import Image from "next/image";
import designExaple1Image from "@/assets/images/design-example-1.png"
import designExaple2Image from "@/assets/images/design-example-2.png"
import Pointer from "@/components/home/common/Pointer";
import { motion , useAnimate } from "framer-motion";
import { useEffect } from "react";
import cursorYouImage from "@/assets/images/cursor-you.svg"


export default function Hero() {
    const [leftDesignScope , leftDesignAnimate] = useAnimate();
    const [leftPointerScope , leftPointerAnimate] = useAnimate();
    
    const [rightDesignScope , rightDesignAnimate] = useAnimate();
    const [rightPointerScope , rightPointerAnimate] = useAnimate();


    useEffect(()=> {
        leftDesignAnimate([
            [leftDesignScope.current,{opacity : 1} , {duration : 0.75} ] ,
            [leftDesignScope.current,{y:0 , x:0 } , {duration : 0.75} ]

        ]) ;

        leftPointerAnimate([
            [leftPointerScope.current,{opacity : 1} , {duration : 0.75} ] ,
            [leftPointerScope.current,{y:0 , x:-100 } , {duration : 0.75} ], 
            [leftPointerScope.current,{x:0 , y:[0,16,0] } , {duration : 0.75 , ease: "easeInOut"} ], 

        
        ]);

        rightDesignAnimate([
            [rightDesignScope.current,{opacity : 1} , {duration : 0.75 , delay: 2.25} ] ,
            [rightDesignScope.current,{x:0 , y:0 } , {duration : 0.75} ]

        ]);

        rightPointerAnimate([
            [rightPointerScope.current,{opacity : 1} , {duration : 0.75 , delay: 2.25} ] ,
            [rightPointerScope.current,{x:175 , y:0} , {duration : 0.75} ] ,
            [rightPointerScope.current,{x:0 , y:[0,20,0]} , {duration : 0.75} ]

            
        ])



        

    })


    return (
        <section className="py-24 overflow-x-clip" style={
            {
                cursor : `url(${cursorYouImage.src}) , auto`
            }
        }>
            <div className="container relative ">


                <motion.div 
                ref={leftDesignScope}  
                drag
                initial={{opacity :0 , y : 100 , x : -100}}
                className="absolute -left-32 top-16 hidden lg:block">
                    <Image src={designExaple1Image} alt="designExaple1Image" draggable="false"/>
                </motion.div>

                <motion.div 
                ref={leftPointerScope}
                initial={{opacity :0 , y : 100 , x : -200}} 
                className="absolute top-96 left-56 hidden lg:block">
                    <Pointer name="Andrea"/>
                </motion.div>




                <motion.div 
                ref={rightDesignScope}
                drag
                initial={{opacity :0 , x : 100 , y : 100}}
                className="absolute -right-64 -top-16 hidden lg:block">
                    <Image src={designExaple2Image} alt="designExaple1Image"  draggable="false"/>
                </motion.div>



              

                <motion.div 
                ref={rightPointerScope}
                initial={{opacity :0 , x: 275 , y : 100}} 
                className="absolute right-80 -top-4 hidden lg:block">
                    <Pointer name="Brayen" color="red"/>
                </motion.div>



                <div className="flex justify-center">
                    <div className="inline-flex py-1 px-3 bg-gradient-to-r from-purple-200 to-pink-400 rounded-full text-neutral-950 font-semibold ">
                        $7.5 Seed Round Raised
                    </div>
                </div>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-center mt-6">
                    Impactfull design , created effortlessly.
                </h1>
                <p className="text-xl text-center text-white/50 mt-8 max-w-2xl mx-auto">
                    Design tools shouldn&apos;t slow you down . Layers combines powerful features with intuitive interface that keeps you in your creative flow. 
                </p>

            </div>


            <form className="flex border border-white/15 rounded-full p-2 mt-8 max-w-lg mx-auto ">
                <input type="email" placeholder="Enter Your Email" className="bg-transparent px-4 md:flex-1 w-full "/>
                <button type="submit" className="border whitespace-nowrap  h-10 rounded-full px-6 font-medium bg-lime-400 text-neutral-950 border-lime-400 hidden md:inline-flex items-center">Sign Up</button>
            </form>
        </section>
    );
}
