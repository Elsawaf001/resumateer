"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useState } from 'react'
interface Props {
    id: string,
    feature: string ,
    route : string
}
function FeatureButton({ id, feature , route }: Props) {
    const [loading, setLoading] = useState(false);

    return (
        <Link href={`/lead/${id}/${route}`} className="w-full">
            <Button size={"lg"} onClick={() => setLoading(true)} className={cn("w-full flex justify-center  py-2 rounded-none text-xl font-bold hover:rounded-lg hover:bg-blue-600 hover:text-white" )}>
                {!loading && feature}
                {loading && <span className='text-sm'>Generating ${feature} ...</span> }

            </Button>
        </Link>
    )
}

export default FeatureButton
