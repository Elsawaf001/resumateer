"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { addAppPoints } from "./userSubscription";

export async function deleteResume(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const resume = await prisma.resume.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  if (resume.photoUrl) {
    await del(resume.photoUrl);
  }

  await prisma.resume.delete({
    where: {
      id,
    },
  });

  await addAppPoints(100);

  revalidatePath("/resumes");
}


export async function deleteLead(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const lead = await prisma.lead.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!lead) {
    throw new Error("lead not found");
  }


  await prisma.lead.delete({
    where: {
      id,
    },
  });

  await addAppPoints(100);

  revalidatePath("/lead");
}