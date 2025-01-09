import prisma from '@/lib/prisma'
import React from 'react'



type Props = { params: { id: string } }

function Page({ params }: Props) {
  const lead = prisma.lead.findUnique({
    where: {
      id: params.id
    },
    select : {
      title: true,
      content: true
    }
  })
 
  return (
    <div>
      <h1>{lead.then(lead => lead?.title)}</h1>
      <h1>{lead.then(lead => lead?.content)}</h1>

      </div>
  )
}

export default Page