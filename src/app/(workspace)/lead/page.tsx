import LeadForm from '@/components/LeadForm/LeadForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { Delete, DeleteIcon, Edit2Icon, Trash2 } from 'lucide-react';
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
      <LeadForm userId={userId} />
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your Leads</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex w-full grid-cols-2 flex-col justify-center items-stretch gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {leads.map((lead) => (

          <Card className="flex flex-col h-full border border-t-2">
            <Link href={`/lead/${lead.id}`} key={lead.id} className="flex-grow flex flex-col">
              <CardHeader className="flex-shrink-0 bg-gray-700 text-lime-400 text-xl font-sans font-bold">{lead.title}</CardHeader>
              <Separator className='text-white py-1' />
              <CardContent className="flex-grow bg-gray-900">{lead.content.substring(0, 100)}</CardContent>
            </Link>
            <CardFooter className="mt-auto mb-0">
                <Button variant={"outline"} className=" hover:bg-red-600 text-white">
                  <Trash2 />
                </Button>
            </CardFooter>
          </Card>


        ))}

      </div>
    </main>
  )
}

export default Page