"use server";

import openai from "@/lib/openai";
import prisma from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";

import { title } from "process";

export async function generateCoverLetter(content: string, leadId: string, leadTitle: string) {
  const { userId } = await auth();


  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingResponse = await prisma.response.findFirst({
    where: {
      leadId: leadId,
      type: "Cover Letter"

    },
    select: {
      id: true,
      content: true,
      type: true

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
    data: {
      leadId: leadId,
      type: "Cover Letter",
      content: aiResponse
    }
  })


  return aiResponse;
}


export async function generateSalaryReport(content: string, leadId: string, leadTitle: string) {
  const { userId } = await auth();


  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingResponse = await prisma.response.findFirst({
    where: {
      leadId: leadId,
      type: "Salary Report"

    },
    select: {
      id: true,
      content: true,
      type: true

    }
  })
  if (existingResponse) {
    return existingResponse.content
  }


  const systemMessage = `
      You are a professional salary estimate report genrator AI. 
      Your task is to analyize the given job discription try to find the job location and experience 
      in the job with the job title try to generate estimate job salary based on the country
       in the job provided by the user , to make a correct estimate it is import to account for job level , job tilte , job location , job experience and any factor you see neccessary,
        salary should be per month and per year  , salary should in this country currency if some data is missing mention it in the report and estimate it .
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
    data: {
      leadId: leadId,
      type: "Salary Report",
      content: aiResponse
    }
  })

 
  return aiResponse;
}








export async function generateTecnicalInterview(content: string, leadId: string, leadTitle: string) {
  const { userId } = await auth();


  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingResponse = await prisma.response.findFirst({
    where: {
      leadId: leadId,
      type: "Technical Interview"

    },
    select: {
      id: true,
      content: true,
      type: true

    }
  })
  if (existingResponse) {
    return existingResponse.content
  }


  const systemMessage = `
      Create a set of 15 professional technical interview questions tailored to the job description provided. The questions should be divided into three levels of difficulty:

Easy (5 questions): Focus on basic concepts and foundational knowledge related to the job description.
Medium (5 questions): Target problem-solving skills and intermediate-level expertise required for the role.
Hard (5 questions): Challenge the candidate's advanced understanding, critical thinking, and ability to apply knowledge in complex scenarios.
For each question:

Provide a clear and concise question.
Include a detailed and accurate answer.
Ensure the content aligns with the job description provided and emphasizes the required skills, tools, and technologies.
Use an engaging and professional tone. Make sure the questions assess both theoretical knowledge and practical application relevant to the role..
      `;

  const userMessage = `
     create technical interview questions tailored to the job description provided.
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
    data: {
      leadId: leadId,
      type: "Technical Interview",
      content: aiResponse
    }
  })


  return aiResponse;
}




export async function generateHRInterview(content: string, leadId: string, leadTitle: string) {
  const { userId } = await auth();


  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingResponse = await prisma.response.findFirst({
    where: {
      leadId: leadId,
      type: "HR Interview"

    },
    select: {
      id: true,
      content: true,
      type: true

    }
  })
  if (existingResponse) {
    return existingResponse.content
  }


  const systemMessage = `
  Generate a set of professional interview questions tailored for assessing candidates in the fields of human resources, soft skills, and IQ. The questions should be  totaling 10 questions. For every question, provide a detailed answer key to guide interviewers in evaluating responses effectively. Ensure the questions assess practical skills, theoretical knowledge, problem-solving ability, and situational judgment relevant to the role described. Maintain a clear, professional tone throughout
      `;

  const userMessage = `
  Generate a set of professional interview questions tailored for assessing candidates in the fields of human resources, soft skills, and IQ. The questions should be  totaling 10 questions. For every question, provide a detailed answer key to guide interviewers in evaluating responses effectively. Ensure the questions assess practical skills, theoretical knowledge, problem-solving ability, and situational judgment relevant to the role described. Maintain a clear, professional tone throughout
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
    data: {
      leadId: leadId,
      type: "HR Interview",
      content: aiResponse
    }
  })


  return aiResponse;
}
