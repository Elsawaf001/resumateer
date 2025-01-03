import EducationForm from "@/components/forms/EducationForm";
import GeneralInfoForm from "@/components/forms/GeneralInfoForm";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import SkillsForm from "@/components/forms/SkillsForm";
import SummaryForm from "@/components/forms/SummaryForm";
import WorkExperienceForm from "@/components/forms/WorkExperienceForm";
import { EditorFormProps } from "@/lib/types";


export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "Skills", component: SkillsForm, key: "skills" },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
];
