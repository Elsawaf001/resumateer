"use server";

import openai from "@/lib/openai";
import prisma from "@/lib/prisma";

import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { addAppPoints } from "./userSubscription";

export async function generateCoverLetter(input: string) {
  const { userId } = await auth();
  

  if (!userId) {
    throw new Error("Unauthorized");
  }

 


  const systemMessage = `
    You are a Cover Letter generator AI. Your task is to write a professional cover letter for the job description given the user's provided data.
    return a professional writen and formatted cover letter that if written for this specific job description provided by the user and do not include any other information in the response. Keep it concise and professional.
    `;

  const userMessage = `
    Please generate a professional cover letter for the following job description:

    Job description: ${input || "N/A"}
    `;

  // console.log("systemMessage", systemMessage);
  // console.log("userMessage", userMessage);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;
  // console.log("total Used Token are :- " + completion.usage?.total_tokens)

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }




  await addAppPoints(completion.usage?.total_tokens);
  return aiResponse;
}
