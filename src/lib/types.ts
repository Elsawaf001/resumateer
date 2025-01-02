import { Prisma } from "@prisma/client";
import { ResumeValues } from "@/lib/validation";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;

export function dateDifferenceInYearsAndMonths(date1: string, date2: string): string {
  // Create date objects
  const startDate: Date = new Date(date1);
  const endDate: Date = new Date(date2);

  // Calculate the difference in years and months
  let years: number = endDate.getFullYear() - startDate.getFullYear();
  let months: number = endDate.getMonth() - startDate.getMonth();

  // Adjust for negative months
  if (months < 0) {
      years--;
      months += 12;
  }

  // Format the result as a string
  const result: string = `${years} years, ${months} months`;
  return result;
}