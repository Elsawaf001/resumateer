import LeadForm from '@/components/LeadForm/LeadForm';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'
import DeleteButton from './_components/DeleteButton';
import FeatureButton from './_components/FeatureButton';

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
  const deleteLead = (leadId: string) => {
    deleteLead(leadId);
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <LeadForm userId={userId} />
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your Leads</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex w-full grid-cols-1 flex-col justify-center items-stretch gap-5 sm:grid md:grid-cols-2 lg:grid-cols-3">
        {leads.map((lead) => (

          <Card className="flex flex-col h-full border border-t-2" key={lead.id} >
            <Link href={`/lead/${lead.id}`} className="flex-grow flex flex-col">
              <CardHeader className="flex-shrink-0 bg-gray-700 text-lime-400 text-xl font-sans font-bold">{lead.title}</CardHeader>
              <Separator className='text-white py-1' />
              <CardContent className="max-h-48 overflow-y-auto flex-1">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
                  {lead?.content}
                </p>
              </CardContent>            </Link>

            <section className="flex-shrink-0 text-center bg-gray-700 px-2 py-2 text-lime-400 text-lg">Use AI to Generate the following </section>

            <CardFooter className="flex flex-col gap-4 mt-4">
              
              <FeatureButton id={lead.id} feature='Cover Letter' route='cover-letter'/>
              <FeatureButton id={lead.id} feature='Salary Report' route='salary-report'/>
              <FeatureButton id={lead.id} feature='Technical Interview Prep' route='technical-interview'/>
              <FeatureButton id={lead.id} feature='HR Interview Prep' route='hr-interview'/>
              <FeatureButton id={lead.id} feature='Study Materials' route='study'/>

        
              <DeleteButton leadId={lead?.id}/>
            </CardFooter>



          </Card>


        ))}

      </div>
    </main>
  )
}

export default Page