import MonthlyButton from '@/components/premuim/paddle/MonthlyButton'
import YearlyButton from '@/components/premuim/paddle/YearlyButton'
import React from 'react'

function page() {
  return (
    <div className='w-full flex justify-center items-center flex-col gap-4'>
      <MonthlyButton/>
      <YearlyButton/>
      </div>
  )
}

export default page