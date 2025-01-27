import LeadForm from '@/components/LeadForm/LeadForm';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'
import DeleteButton from './_components/DeleteButton';
import FeatureButton from './_components/FeatureButton';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Genei - Tailored Cover Letters & Job Insights | Resumateer",
  description:
    "Use Lead Genei to generate personalized cover letters and salary reports. Optimize resumes for specific job postings with AI-driven insights.",
  keywords: "lead generator, custom cover letters, salary reports, AI job tools, resume optimization, ATS-ready resumes",
  openGraph: {
    title: "Lead Genei - Tailored Cover Letters & Job Insights | Resumateer",
    description:
      "Enhance your job applications with Lead Genei. Create custom cover letters, generate salary insights, and optimize your resume for ATS systems.",
    url: "https://www.resumateer.com/lead",
    siteName: "Resumateer",
    images: [
      {
        url: "https://www.resumateer.com/images/lead-og-image.png",
        width: 1200,
        height: 630,
        alt: "Lead Genei - Tailored Cover Letters & Job Insights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead Genei - Tailored Cover Letters & Job Insights | Resumateer",
    description:
      "Personalize your job applications with AI. Lead Genei helps you create custom cover letters and provides salary insights.",
    images: ["https://www.resumateer.com/images/lead-twitter-card.png"],
  },
};

async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [leads, totalCount ] = await Promise.all([
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
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6 min-h-screen">
      <LeadForm userId={userId}  />
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
              <FeatureButton id={lead.id} feature='CV ATS Optimizer' route='resume-ats'/>

              <DeleteButton leadId={lead?.id}/>
            </CardFooter>



          </Card>


        ))}

      </div>
    </main>
  )
}

export default Page