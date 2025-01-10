import { generateCoverLetter, generateSalaryReport } from '@/actions/lead'
import LeadPreview from '@/components/LeadPreview'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import { cn } from '@/lib/utils'
import { Metadata } from "next";
import Link from 'next/link'

interface CoverPageProps {
  params: {
    id: string;
  };
}





async function Page({ params }: CoverPageProps) {
  const lead = await prisma.lead.findUnique({
    where: {
      id: params.id
    },
    select: {
      title: true,
      content: true
    }
  })

  const contentAI = await generateCoverLetter(lead ? lead?.title + lead?.content : "" , params.id , lead? lead.title : "")
  

  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4 flex-1">
        {/* Card Section */}
        <Card className="w-full lg:w-1/3 flex flex-col">
          <CardHeader>
            <h1 className="text-2xl font-bold">{lead?.title}</h1>
          </CardHeader>
          <CardContent className="max-h-48 overflow-y-auto flex-1">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
              {lead?.content}
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 mt-4">
            <Button
            
              size="lg"
              className="w-full hover:bg-blue-500 hover:text-white transition duration-300"
            >
               <Link href={`/lead/${params.id}/cover-letter`}>
                 Cover Letter
                 </Link>
            </Button>
            <Button
              size="lg"
              className="w-full hover:bg-blue-500 hover:text-white transition duration-300"
            >
                <Link href={`/lead/${params.id}/salary-report`}>
                Salary Estimate Report
                </Link>
              
            </Button>
            <Button
              size="lg"
              className="w-full hover:bg-blue-500 hover:text-white transition duration-300"
            >
                <Link href={`/lead/${params.id}/techincal-interview`}>
                Techincal Interview Questions
                </Link>
              
            </Button>
            <Button
              size="lg"
              className="w-full hover:bg-blue-500 hover:text-white transition duration-300"
            >
                <Link href={`/lead/${params.id}/hr-interview`}>
                HR Interview Questions
                </Link>
              

            </Button>
            <Button
              size="lg"
              className="w-full hover:bg-blue-500 hover:text-white transition duration-300"
            >
                <Link href={`/lead/${params.id}/course`}>
                Prep Course
                </Link>
              

            </Button>
          </CardFooter>
        </Card>

        {/* Preview Section */}
        <main className="w-full lg:w-2/3 relative">
          <LeadPreview
            className="whitespace-pre-wrap break-words"
            responseData={contentAI}
          />
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-4 p-4 bg-gray-100">
        Footer
      </footer>
    </div>

  )
}

export default Page