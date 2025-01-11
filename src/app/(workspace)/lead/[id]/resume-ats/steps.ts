
import { EditorFormProps } from "@/lib/types";
import ATSSkillsForm from "./forms/SkillsForm";
import ATSSummaryForm from "./forms/SummaryForm";
import ATSEducationForm from "./forms/EducationForm";
import ATSWorkExperienceForm from "./forms/WorkExperienceForm";
import ATSPersonalInfoForm from "./forms/PersonalInfoForm";
import ATSGeneralInfoForm from "./forms/GeneralInfoForm";


export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: ATSGeneralInfoForm, key: "general-info" },
  { title: "Personal info", component: ATSPersonalInfoForm, key: "personal-info" },
  {
    title: "Work experience",
    component: ATSWorkExperienceForm,
    key: "work-experience",
  },
  { title: "Education", component: ATSEducationForm, key: "education" },
  { title: "Skills", component: ATSSkillsForm, key: "skills" },
  {
    title: "Summary",
    component: ATSSummaryForm,
    key: "summary",
  },
];
