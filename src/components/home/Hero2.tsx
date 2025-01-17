"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import elsawaf from "@/assets/elsawaf.png"
import preview from "@/assets/preview.jpg"

import Tag from './common/Tag'
import Link from 'next/link'

function Hero2() {
        const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex pt-12 px-6 md:px-20  items-center justify-center bg-hero md:h-screen overflow-hidden">
    <div className="flex flex-col  gap-6 md:flex-row items-center max-w-8xl">
        <div className="w-full md:w-1/2 lg:pr-32">
        <div>
    
                    <Tag>Your Career Starts Here</Tag>
                    <h2 className="text-6xl mt-6 font-medium  ">Build Resumes That Get You   <span className="text-lime-400">Hired</span></h2>
                    <p className="text-white/50 mt-4 text-lg"> Resumateer combines advanced AI technology with intuitive tools to help you craft professional resumes, personalized cover letters, and ATS-optimized CVs effortlessly.</p>

                </div>
            <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start">
           
                    <Link onClick={() => setIsLoading(true)}  href={"/sign-up"} className="border  h-12 rounded-full px-6 font-extrabold font-sans text-xl bg-lime-400 text-neutral-950 border-lime-400 hidden md:inline-flex items-center">
                    {!isLoading && "Start now"} {isLoading && "loading..."}
                   
                    </Link>
            </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <Image className='md:h-screen mb-5 aspect-auto'  alt={'elsawaf'} src={elsawaf}/>
        </div>
    </div>
</div>
  )
}

export default Hero2
