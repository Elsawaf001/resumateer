"use client"
import Tag from "@/components/home/common/Tag";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "motion/react";

const faqs = [
    {
        question: "What is Resumateer, and how does it work?",
        answer: "Resumateer is an all-in-one career platform that helps job seekers create professional resumes and cover letters, optimize them for ATS (Applicant Tracking System) compliance, and tailor their applications to specific job descriptions. With AI-powered tools, you can easily build, enhance, and customize your CV to stand out from the competition.",
    },
    {
        question: "What features does Resumateer offer?",
        answer: `Resumateer provides a variety of features, including:
        CV Builder: Create a professional resume from scratch.
        AI CV Builder: Use AI to craft a personalized CV.
        Cover Letter Creator: Generate compelling cover letters tailored to your needs.
        CV Optimization: Tailor your resume for specific job descriptions.
        Job Leads: Access job postings and link your applications.
        Salary Estimate Report: Get insights into salary ranges for your desired roles.
        ATS Enhancement: Ensure your resume is ATS-compliant for better visibility.
       `,
    },
    {
        question: "How does the CV optimization work?",
        answer: "With Resumateer's CV optimization feature, you can add specific job description. Our AI analyzes the job requirements and enhances your CV to highlight relevant skills and experiences, making it more likely to pass through Applicant Tracking Systems and impress hiring managers.",
    },
    {
        question: "Can I customize my cover letters for different job applications?",
        answer: "Absolutely! Our Cover Letter Creator allows you to customize your cover letters for different roles. You can start from scratch or use AI to generate personalized cover letters that align with specific job descriptions and your career goals..",
    },
    {
        question: "What is the Salary Estimate Report feature?",
        answer: "The Salary Estimate Report provides a detailed analysis of expected salary ranges based on the job title, location, and industry. This feature helps you understand your market value and negotiate better compensation during job applications or interviews.",
    },
];

export default function Faqs() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <section className="py-24 ">
            <div className="container  ">
                <div className="flex justify-center ">
                    <Tag>Faqs</Tag>
                </div>

                <h2 className="text-6xl font-medium mt-6 text-center max-w-xl mx-auto">Question ? We&apos;ve got <span className="text-lime-400">answers</span></h2>
                <div className="mt-12 flex flex-col gap-6 max-w-xl mx-auto">
                    {faqs.map((faq, faqIndex) => (
                        <div key={faq.question} className="bg-neutral-900 rounded-2xl border-white/10 p-6">
                            <div className="flex justify-between items-center" onClick={() => setSelectedIndex(faqIndex)}>
                                <h3 className="font-medium ">{faq.question}</h3>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={twMerge("feather flex-shrink-0 text-lime-400 feather-plus transition duration-300", selectedIndex === faqIndex && "rotate-45")}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </div>

                            <AnimatePresence>


                                {selectedIndex === faqIndex && (
                                    <motion.div
                                        initial={{
                                            height: 0,
                                            marginTop: 0
                                        }}
                                        animate={{
                                            height: "auto",
                                            marginTop: 24
                                        }}
                                        exit={{
                                            height: 0,
                                            marginTop: 0
                                        }}
                                        className={twMerge("mt-6 overflow-hidden")}>
                                        <p className="text-white/50">{faq.answer}</p>
                                    </motion.div>)

                                }

                            </AnimatePresence>





                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
