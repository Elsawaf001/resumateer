"use server";


import prisma from "@/lib/prisma";

export async function duplicateAndModifyResume(resumeId: string , modifiedTitle : string , modifiedDescription : string , modifiedJobTitle : string  ) {

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

    // Create a new resume with modified title and description
    const newResume = await prisma.resume.create({
        data: {
          userId: existingResume.userId,
          title: modifiedTitle,
          description: modifiedDescription,
          photoUrl: existingResume.photoUrl,
          colorHex: existingResume.colorHex,
          borderStyle: existingResume.borderStyle,
          summary: existingResume.summary,
          firstName: existingResume.firstName,
          lastName: existingResume.lastName,
          jobTitle: modifiedJobTitle,
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