import React from "react";
import Image from "next/image";
import step1 from "@/assets/step1.png";
import step2 from "@/assets/step2.png";
import step3 from "@/assets/step3.png";
import step4 from "@/assets/step4.png";
import step5 from "@/assets/step5.png";
import step6 from "@/assets/step6.png";
import step7 from "@/assets/step7.png";
import step8 from "@/assets/step8.png";
import step9 from "@/assets/step9.png";
import step10 from "@/assets/step10.png";
import Link from "next/link";


const HowToCreateResume = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-lime-400 mb-6">
        How to Create a Resume on Resumateer: A Step-by-Step Guide
      </h1>
      <p className="text-lg text-white mb-8 text-center">
        Follow these 10 simple steps to create a professional resume using Resumateer’s AI-powered tools.
      </p>

      <div className="space-y-12">
        {/* Step 1 */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src={step1}
              alt="Step 1 Image"
              width={500}
              height={300}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-lime-400 mb-3">Step 1: Sign Up or Log In</h2>
            <p className="text-lg text-white">
              First, head over to <Link href={"/sign-in"}>Resumateer.com</Link> and sign up or log in to your account.
              If you’re new, simply click on the "Sign Up" button and create an account using your email.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src={step2}
              alt="Step 2 Image"
              width={500}
              height={300}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-lime-400 mb-3">Step 2: create new resume</h2>
            <p className="text-lg text-white">
              Once logged in, click on the "Create Resume" button. to open the resume builder tool. 
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src={step3}
              alt="Step 3 Image"
              width={500}
              height={300}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-lime-400 mb-3">Step 3: Prject Info</h2>
            <p className="text-lg text-white">
              Start be filling project info , this is just the resume name and description. this info won't show up in your resume
    
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src={step4}
              alt="Step 4 Image"
              width={500}
              height={300}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-lime-400 mb-3">Step 4: Add Your Basic Info</h2>
            <p className="text-lg text-white">
            Start by filling in your name, Title, contact information, Make sure all details
            are accurate to help employers reach out to you easily.
             
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src={step5}
              alt="Step 5 Image"
              width={500}
              height={300}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-lime-400 mb-3">Step 5: Add Word Experiences </h2>
            <p className="text-lg text-white">
start adding your work Experiences , you can add multiple work Experiences , you can sort them , you can use AI to create it for you             </p>
          </div>
        </div>

        {/* Step 6 */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src={step6}
              alt="Step 6 Image"
              width={500}
              height={300}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-lime-400 mb-3">Step 6: Add Education or certificates </h2>
            <p className="text-lg text-white">
            Don’t forget to add your educational qualifications, including degrees, certifications, and training.

            </p>
          </div>
        </div>

        {/* Step 7 */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src={step7}
              alt="Step 7 Image"
              width={500}
              height={300}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-lime-400 mb-3">Step 7:Add Skills</h2>
            <p className="text-lg text-white">
              
list your skills and a comma after each skill

            </p>
          </div>
        </div>

        {/* Step 8 */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src={step8}
              alt="Step 8 Image"
              width={500}
              height={300}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-lime-400 mb-3">Step 8: Set up A Professional Summary</h2>
            <p className="text-lg text-white">
              add a professional summary to your resume, this is the first thing the employer will see , you can let ai read your resume and generate it for you
            </p>
          </div>
        </div>

        {/* Step 9 */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src={step9}
              alt="Step 9 Image"
              width={500}
              height={300}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-lime-400 mb-3">Step 9: save your work</h2>
            <p className="text-lg text-white">
              your work is saved automatically , you can come back and edit it anytime 
            </p>
          </div>
        </div>

        {/* Step 10 */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src={step10}
              alt="Step 10 Image"
              width={500}
              height={300}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-lime-400 mb-3">Step 10: Download and Apply</h2>
            <p className="text-lg text-white">
              Once you’re satisfied with your resume, download them as PDF files. Now you’re ready to apply
              to your dream job!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToCreateResume;
