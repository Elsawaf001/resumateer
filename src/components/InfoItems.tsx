"use client"
import { useAuth, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { CreditCard } from 'lucide-react';
import Link from 'next/link'
import React from 'react'

function InfoItems() {
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
                                label="Dashboard"
                                labelIcon={<CreditCard className="size-4" />}
                                href="/dashboard"
                            />
                        </UserButton.MenuItems>
                    </UserButton>

                    <Link href={"/dashboard"} className="border  h-12 rounded-full px-6 font-medium bg-lime-400 text-neutral-950 border-lime-400 hidden md:inline-flex items-center" >Dashboard</Link>
                </>
            }

            {!userId &&
                <>
                    <Link href={"/sign-in"} className="border  h-12 rounded-full px-6 font-medium border-white text-white bg-transparent hidden md:inline-flex items-center" >Log In</Link>
                    <Link href={"/sign-up"} className="border  h-12 rounded-full px-6 font-medium bg-lime-400 text-neutral-950 border-lime-400 hidden md:inline-flex items-center">Sign Up</Link>

                </>
            }
        </div>
    )
}

export default InfoItems
