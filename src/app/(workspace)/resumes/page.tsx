import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

import ResumeItem from "./_components/ResumeItem";
import CreateResumeButton from "./_components/CreateResumeButton";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { canCreateResume } from "@/lib/permissions";


export const metadata: Metadata = {
  title: "Resumes - AI-Powered Professional CV Builder | Resumateer",
  description:
    "Create a professional resume with Resumateer's AI-powered resume builder. Tailor your CV to job postings, optimize for ATS systems, and land your dream job.",
  keywords: "resume builder, professional CV, AI resume generator, ATS optimization, career tools, job application",
  openGraph: {
    title: "Resumes - AI-Powered Professional CV Builder | Resumateer",
    description:
      "Build resumes tailored to job postings, optimized for ATS systems, and ready to impress recruiters. Try Resumateer's advanced AI tools now.",
    url: "https://www.resumateer.com/resumes",
    siteName: "Resumateer",
    images: [
      {
        url: "https://www.resumateer.com/images/resumes-og-image.png",
        width: 1200,
        height: 630,
        alt: "Resumes - AI-Powered Professional CV Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resumes - AI-Powered Professional CV Builder | Resumateer",
    description:
      "Create professional resumes that get noticed. AI-powered tools help you tailor and optimize your CV for every job application.",
    images: ["https://www.resumateer.com/images/resumes-twitter-card.png"],
  },
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }


  const [resumes, totalCount, subscriptionLevel] = await Promise.all([
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
    getUserSubscriptionLevel(userId),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <CreateResumeButton canCreate={canCreateResume(subscriptionLevel , totalCount)}/>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
    
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
}