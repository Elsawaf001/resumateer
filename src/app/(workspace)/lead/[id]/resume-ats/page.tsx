import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import ATSResumeItem from "./ATSResumeItem";


interface PageProps {
    params: Promise<{
        id: string;
    }>;

}

export const metadata: Metadata = {
  title: "Your resumes",
};

export default async function Page(props : PageProps) {
    const params = await props.params;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }


  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
    
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Choose A Resume to Obtimize for your lead</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ATSResumeItem key={resume.id} resume={resume} leadId={params.id} />
        ))}
        <p>Lead Id is {params.id}</p>
      </div>
    </main>
  );
}