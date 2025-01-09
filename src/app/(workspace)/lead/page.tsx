import LeadForm from '@/components/LeadForm/LeadForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { Linden_Hill } from 'next/font/google';
import Link from 'next/link';
import React from 'react'

async function Page() {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    const [leads, totalCount] = await Promise.all([
      prisma.lead.findMany({
        where: {
          userId,
        },
        orderBy: {
          updatedAt: "desc",
        },
      }),
      prisma.lead.count({
        where: {
          userId,
        },
      }),
      
    ]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      {/* <CreateResumeButton/> */}
      <LeadForm userId={userId}/>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your Leads</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex w-full grid-cols-2 flex-col justify-center items-center gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {leads.map((lead) => (
          <Link href={`/lead/${lead.id}`} key={lead.id}>
           <Card >
           <CardHeader>{lead.title}</CardHeader>
           <Separator className='text-white py-1'/>
           <CardContent>{lead.content.substring(0,100)}</CardContent>
         </Card>
          </Link>
          
        ))}
       
      </div>
    </main>
  )
}

export default Page