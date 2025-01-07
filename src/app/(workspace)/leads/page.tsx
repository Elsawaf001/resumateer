import React from 'react'
import CreateLeadButton from './_Components/CreateLeadButton'


function page() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
    <CreateLeadButton/>
    <div className="space-y-1">
      <h1 className="text-3xl font-bold">Your Leads</h1>
      <p>Total: </p>
    </div>
    <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
      query your leads here 
    </div>
  </main>
  )
}

export default page
