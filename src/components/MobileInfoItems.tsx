"use client"
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'

function MobileInfoItems() {
    const { userId } = useAuth();
    return (
        <>
            {userId &&

                <Link href={"/dashboard"} className="border  h-12 rounded-full px-6 py-2 font-medium bg-lime-400 text-neutral-950 border-lime-400  md:inline-flex items-center" >Dashboard</Link>

            }

            {!userId &&
                <>
                    <Link href={"/sign-in"} className="border  h-12 rounded-full px-6 py-2 font-medium border-white text-white bg-transparent  md:inline-flex items-center" >Log In</Link>
                    <Link href={"/sign-up"} className="border  h-12 rounded-full px-6 py-2 font-medium bg-lime-400 text-neutral-950 border-lime-400  md:inline-flex items-center">Sign Up</Link>

                </>
            }


        </>
    )
}

export default MobileInfoItems
