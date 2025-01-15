"use client"

import React, { use, useEffect } from 'react'
import { addPaidPoints } from './actions';
import { useRouter } from 'next/navigation';

type Props = { params: Promise<{ id: string }> }

async function Page(props: Props) {

const router = useRouter()

useEffect( ()=> {
      addPaidPoints(10000)
     router.push("/resumes")
})
   


    return (
        <div>Payment Successful! </div>
  )
}

export default Page