"use server";


import { addAppPoints } from "@/actions/userSubscription";
import openai from "@/lib/openai";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { canCreateResume } from "@/lib/permissions";

export async function duplicateAndModifyResume(resumeId: string, leadId: string) {
  const { userId } = await auth();


  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

 
    const resumeCount = await prisma.resume.count({ where: { userId } });

    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error(
        "Maximum resume count reached for this subscription level",
      );
    }
  


  // Find the existing resume by ID
  const existingResume = await prisma.resume.findUnique({
    where: { id: resumeId },
    include: {
      workExperiences: true, // Include related work experiences
      educations: true, // Include related educations
    },
  });

  if (!existingResume) {
    throw new Error(`Resume with ID ${resumeId} not found.`);
  }
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },

  });

  if (!lead) {
    throw new Error(`Lead with ID ${leadId} not found.`);
  }

  const oldSummary = existingResume.summary;
  const workExperiences = existingResume.workExperiences.map(exp => exp.description) ;
  const educationsList = existingResume.educations.map(edu => edu.degree ) ;
  const optimizedSummary = await optimizeSummary(oldSummary? oldSummary : "" , lead.title , lead.content , workExperiences , educationsList);


  const oldSkils = existingResume.skills 
  const descriptions = existingResume.workExperiences.map(exp => exp.description)
  const educations = existingResume.educations.map(edu => edu.degree)
  const optimizedSkils = await optimizeSkils(oldSkils? oldSkils : [] , descriptions ,educations , lead.title , lead.content)

  // Create a new resume with modified title and description
  const newResume = await prisma.resume.create({
    data: {
      userId: existingResume.userId,
      title: existingResume.title,
      description: existingResume.description + " Optimized For " + lead.title,
      photoUrl: existingResume.photoUrl,
      colorHex: existingResume.colorHex,
      borderStyle: existingResume.borderStyle,
      summary: optimizedSummary,
      firstName: existingResume.firstName,
      lastName: existingResume.lastName,
      jobTitle: existingResume.jobTitle,
      city: existingResume.city,
      country: existingResume.country,
      phone: existingResume.phone,
      email: existingResume.email,
      skills: optimizedSkils,
      workExperiences: {
        create: existingResume.workExperiences.map((experience) => ({
          position: experience.position,
          company: experience.company,
          startDate: experience.startDate,
          endDate: experience.endDate,
          description: experience.description,
        })),
      },
      educations: {
        create: existingResume.educations.map((education) => ({
          degree: education.degree,
          school: education.school,
          startDate: education.startDate,
          endDate: education.endDate,
        })),
      },
    },
  });

  return newResume;


}

async function optimizeSummary(oldSummary: string , title : string , content : string , workExperiences? : string[]  , educations? : string[]) {

  const systemMessage = `
  You are a professional resume writer and editor specializing in crafting summaries optimized for Applicant Tracking Systems (ATS) and resume checkers.

I will provide five inputs:

CV Summary: A brief summary of the candidate's skills, experience, and qualifications.
Job Title: The target job title.
Job Description: The key responsibilities, requirements, and qualifications listed in the job description.
Work Experiences: The candidate's past work experiences.
Educations: The candidate's educational background.
Your task is to:

Rewrite the CV summary to align closely with the job title and job description, emphasizing the most relevant skills, experiences, and qualifications.
Use keywords and phrases from the job description to enhance ATS compatibility, ensuring the summary is professional, clear, and naturally written.
Highlight connections between the candidate's work experiences and the job requirements without fabricating or misrepresenting information. Focus on what the candidate has demonstrably achieved or demonstrated.
Avoid generic or repetitive language and keep the summary concise and impactful (around 3–5 sentences).
Ensure the summary is truthful and focused on how the candidate's expertise meets the role's specific requirements and adds value to the company.
By adhering to these guidelines, your summary will accurately reflect the candidate's qualifications while aligning seamlessly with the job description. `;

  const userMessage = `
  Here are the inputs for the task:
  CV Summary: ${oldSummary}
  Job Title: ${title}
  Job Description:${content}}
  work Experiences: ${workExperiences}
  educations: ${educations}
  Rewrite the CV summary to:
  1. Highlight the most relevant skills, experiences, and qualifications.
  2. Use keywords and phrases from the job description for better ATS compatibility.
  3. Keep the tone professional and concise (3-5 sentences).
  Provide the optimized summary below.
      `;

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

async function optimizeSkils(oldSkils: string[] ,  descriptions? : string[] | null , educations? : string[] | null ,title? : string | null, content? : string | null) {

  const systemMessage = `
  You are a professional resume optimization assistant. Your role is to analyze the user’s inputs, which include their skills, work experience, education, the title of the job they are applying for, and the job description. Using this information, you will generate a list of up to 12 comma-separated skills that are:

  Relevant to the job description.
  Optimized for ATS (Applicant Tracking Systems).
  Reflective of the user's qualifications and experience.
  Ensure the list includes industry-specific keywords and aligns with the user’s background and the job they are applying for.
      `;

  const userMessage = `
  Here is the information:

  Skills: ${oldSkils}
  Work Experience: ${descriptions}
  Education: ${educations}
  Job Title: ${title}
  Job Description: ${content}
  Generate a list of up to 12 comma-separated skills that match the job description, are optimized for ATS, and are reflective of my qualifications..
      `;

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
  return aiResponse.split(",").map(word => word.trim());

}