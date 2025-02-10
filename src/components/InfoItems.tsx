"use client"
import { useAuth, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { CreditCard } from 'lucide-react';
import Link from 'next/link'
import React, { useState } from 'react'

function InfoItems() {
    const [isLoading, setIsLoading] = useState(false);
    const [isResgistering, setIsResgistering] = useState(false);


    const { userId } = useAuth();
    return (
        <div className='hidden md:flex gap-4'>
            {userId &&
                <>
                    <UserButton
                        appearance={{
                            baseTheme: dark,
                            elements: {
                                avatarBox: {
                                    width: 48,
                                    height: 48,
                                },
                            },
                        }}
                    >
                        <UserButton.MenuItems>
                            <UserButton.Link
                                label="resumes"
                                labelIcon={<CreditCard className="size-4" />}
                                href="/resumes"
                            />
                        </UserButton.MenuItems>
                    </UserButton>

                    <Link onClick={() => setIsLoading(true)} href={"/resumes"} className="border  h-12 rounded-full px-6 font-medium bg-lime-400 text-neutral-950 border-lime-400 hidden md:inline-flex items-center" >
                   {!isLoading && "resumes"} {isLoading && "loading..."}
                    </Link>
                    
                </>
            }

            {!userId &&
                <>
                    <Link onClick={() => setIsLoading(true)} href={"/sign-in"} className="border  h-12 rounded-full px-6 font-medium border-white text-white bg-transparent hidden md:inline-flex items-center" >
                    
                    {!isLoading && "Log In"} {isLoading && "loading..."}
                    </Link>
                    <Link onClick={() => setIsResgistering(true)}  href={"/sign-up"} className="border  h-12 rounded-full px-6 font-medium bg-lime-400 text-neutral-950 border-lime-400 hidden md:inline-flex items-center">
                    {!isResgistering && "Resgister now"} {isResgistering && "Resgistering..."}
                   
                    </Link>

                </>
            }
        </div>
    )
}

export default InfoItems
