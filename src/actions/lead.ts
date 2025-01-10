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
import { title } from "process";

export async function generateCoverLetter(content: string , leadId : string , leadTitle : string) {
  const { userId } = await auth();
  

  if (!userId) {
    throw new Error("Unauthorized");
  }

 const existingResponse = await prisma.response.findFirst({
    where: {
        leadId: leadId ,
        type : "Cover Letter"

    },
    select : {
        id : true ,
        content : true ,
        type : true

    }
 })
 if (existingResponse) {
    return existingResponse.content
 }


  const systemMessage = `
    You are a Cover Letter generator AI. Your task is to write a professional cover letter for the job description given the user's provided data.
    return a professional writen and formatted cover letter that if written for this specific job description provided by the user and do not include any other information in the response. Keep it concise and professional.
    `;

  const userMessage = `
    Please generate a professional cover letter for the following job description:
    Job description title: ${title || "N/A"}
    Job description: ${content || "N/A"}
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


await prisma.response.create({
    data : {
        leadId : leadId ,
        type : "Cover Letter" ,
        content : aiResponse
    }
})

  await addAppPoints(completion.usage?.total_tokens);
  return aiResponse;
}


export async function generateSalaryReport(content: string , leadId : string , leadTitle : string) {
    const { userId } = await auth();
    
  
    if (!userId) {
      throw new Error("Unauthorized");
    }
  
   const existingResponse = await prisma.response.findFirst({
      where: {
          leadId: leadId ,
          type : "Salary Report"
  
      },
      select : {
          id : true ,
          content : true ,
          type : true
  
      }
   })
   if (existingResponse) {
      return existingResponse.content
   }
  
  
    const systemMessage = `
      You are a professional salary estimate report genrator AI. Your task is to analyize the given job discription try to find the job location and experience in the job with the job title try to generate estimate job salary based on the country in the job posting , salary should be per month and per year  , salary should in this country currency if some data is missing mention it in the report and estimate it .
      return a professional writen and formatted salary estimate report that is written for this specific job description provided by the user and do not include any other information in the response. Keep it concise and professional.
      `;
  
    const userMessage = `
      Please generate a professional salary estimate report for the following job description:
      Job description title: ${title || "N/A"}
      Job description: ${content || "N/A"}
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
  
  
  await prisma.response.create({
      data : {
          leadId : leadId ,
          type : "Salary Report" ,
          content : aiResponse
      }
  })
  
    await addAppPoints(completion.usage?.total_tokens);
    return aiResponse;
  }
