import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logo from "@/assets/logo.png";

function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full h-9 md:h-auto w-auto"
          />
          <span className="text-2xl font-sans font-bold tracking-tight ">
            Resumateer
          </span>
        </Link>
  )
}

export default Logo
