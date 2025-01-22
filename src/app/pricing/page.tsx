import MonthlyButton from '@/components/premuim/paddle/MonthlyButton'
import YearlyButton from '@/components/premuim/paddle/YearlyButton'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

async function page() {
  const userId = await auth();
  return (
    <div className='w-full flex justify-center items-center flex-col gap-4'>
      <MonthlyButton userId={userId.userId} />
      </div>
  )
}

export default page