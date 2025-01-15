"use client"

import React, { use, useEffect } from 'react'
import { addPaidPoints } from './actions';
import { useRouter } from 'next/navigation';
import prisma from '@/lib/prisma';

type Props = { params: Promise<{ id: string }> }

async function Page(props: Props) {
    const params = await props.params;
    const userId = params.id ;
const router = useRouter()

useEffect( ()=> {
    const existingSubscription =  prisma.userSubscription.findUnique({
        where: { userId },
      });

      if (!existingSubscription) {
       return
    }

   prisma.userSubscription.update({
        where: { userId },
        data: {
          appPoints: { increment: 10000 },

        },
      });

     router.push("/resumes")
},[])
   


    return (
        <div>Payment Successful! </div>
  )
}

export default Page