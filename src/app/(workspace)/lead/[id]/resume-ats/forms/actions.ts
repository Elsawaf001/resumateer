"use server";


import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function duplicateAndModifyResume(resumeId: string ,leadId : string ) {
  const { userId } = await auth();


  if (!userId) {
    throw new Error("Unauthorized");
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



    // Create a new resume with modified title and description
    const newResume = await prisma.resume.create({
        data: {
          userId: existingResume.userId,
          title: existingResume.title + " Optimized For " + lead.title,
          description: existingResume.description + " Optimized For " + lead.title,
          photoUrl: existingResume.photoUrl,
          colorHex: existingResume.colorHex,
          borderStyle: existingResume.borderStyle,
          summary: existingResume.summary,
          firstName: existingResume.firstName,
          lastName: existingResume.lastName,
          jobTitle: existingResume.jobTitle,
          city: existingResume.city,
          country: existingResume.country,
          phone: existingResume.phone,
          email: existingResume.email,
          skills: existingResume.skills,
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



// export async function generateTecnicalInterview(content: string, leadId: string, leadTitle: string) {


//   const existingResponse = await prisma.response.findFirst({
//     where: {
//       leadId: leadId,
//       type: "Technical Interview"

//     },
//     select: {
//       id: true,
//       content: true,
//       type: true

//     }
//   })
//   if (existingResponse) {
//     return existingResponse.content
//   }


//   const systemMessage = `
//       Create a set of 15 professional technical interview questions tailored to the job description provided. The questions should be divided into three levels of difficulty:

// Easy (5 questions): Focus on basic concepts and foundational knowledge related to the job description.
// Medium (5 questions): Target problem-solving skills and intermediate-level expertise required for the role.
// Hard (5 questions): Challenge the candidate's advanced understanding, critical thinking, and ability to apply knowledge in complex scenarios.
// For each question:

// Provide a clear and concise question.
// Include a detailed and accurate answer.
// Ensure the content aligns with the job description provided and emphasizes the required skills, tools, and technologies.
// Use an engaging and professional tone. Make sure the questions assess both theoretical knowledge and practical application relevant to the role..
//       `;

//   const userMessage = `
//      create technical interview questions tailored to the job description provided.
//       Job description title: ${title || "N/A"}
//       Job description: ${content || "N/A"}
//       `;

//   // console.log("systemMessage", systemMessage);
//   // console.log("userMessage", userMessage);

//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       {
//         role: "system",
//         content: systemMessage,
//       },
//       {
//         role: "user",
//         content: userMessage,
//       },
//     ],
//   });

//   const aiResponse = completion.choices[0].message.content;
//   // console.log("total Used Token are :- " + completion.usage?.total_tokens)

//   if (!aiResponse) {
//     throw new Error("Failed to generate AI response");
//   }


//   await prisma.response.create({
//     data: {
//       leadId: leadId,
//       type: "Technical Interview",
//       content: aiResponse
//     }
//   })

//   await addAppPoints(completion.usage?.total_tokens);
//   return aiResponse;
// }




// export async function generateHRInterview(content: string, leadId: string, leadTitle: string) {
//   const { userId } = await auth();


//   if (!userId) {
//     throw new Error("Unauthorized");
//   }

//   const existingResponse = await prisma.response.findFirst({
//     where: {
//       leadId: leadId,
//       type: "HR Interview"

//     },
//     select: {
//       id: true,
//       content: true,
//       type: true

//     }
//   })
//   if (existingResponse) {
//     return existingResponse.content
//   }


//   const systemMessage = `
//   Generate a set of professional interview questions tailored for assessing candidates in the fields of human resources, soft skills, and IQ. The questions should be  totaling 10 questions. For every question, provide a detailed answer key to guide interviewers in evaluating responses effectively. Ensure the questions assess practical skills, theoretical knowledge, problem-solving ability, and situational judgment relevant to the role described. Maintain a clear, professional tone throughout
//       `;

//   const userMessage = `
//   Generate a set of professional interview questions tailored for assessing candidates in the fields of human resources, soft skills, and IQ. The questions should be  totaling 10 questions. For every question, provide a detailed answer key to guide interviewers in evaluating responses effectively. Ensure the questions assess practical skills, theoretical knowledge, problem-solving ability, and situational judgment relevant to the role described. Maintain a clear, professional tone throughout
//      Job description title: ${title || "N/A"}
//       Job description: ${content || "N/A"}
//       `;

//   // console.log("systemMessage", systemMessage);
//   // console.log("userMessage", userMessage);

//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       {
//         role: "system",
//         content: systemMessage,
//       },
//       {
//         role: "user",
//         content: userMessage,
//       },
//     ],
//   });

//   const aiResponse = completion.choices[0].message.content;
//   // console.log("total Used Token are :- " + completion.usage?.total_tokens)

//   if (!aiResponse) {
//     throw new Error("Failed to generate AI response");
//   }


//   await prisma.response.create({
//     data: {
//       leadId: leadId,
//       type: "HR Interview",
//       content: aiResponse
//     }
//   })

//   await addAppPoints(completion.usage?.total_tokens);
//   return aiResponse;
// }
