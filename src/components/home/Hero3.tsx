import Image from 'next/image'
import React from 'react'
import screen from "@/assets/screen.png"
import Tag from './common/Tag'
function Hero3() {
    return (
        <div className="max-w-screen-xl mx-auto py-8 px-4 lg:py-16 lg:px-6">
            <div className="text-center mb-10">
                <h2 className="text-4xl tracking-tight font-bold text-primary-800"> 
                    <Tag>Inroducing Lead Genie</Tag>
                    </h2>

            </div>

            <div className="flex flex-col md:flex-row">
               
                <div className="mr-0 md:mr-8 mb-6 md:mb-0">
                    <Image className="w-1/2 md:w-full mx-auto" src={screen} alt="can_help_banner"/>
                </div>
                

                <div className="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
                    <div className="w-full sm:w-1/2 mb-4 px-2 ">
                        <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                            <h3 className="text-2xl font-bold text-md mb-6 text-lime-400 ">1- Add your lead</h3>
                            <p className="text-lg">Easily copy and paste any job posting or lead from your favorite platforms. Let Lead Genie analyze the details to uncover key insights for your application.</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 mb-4 px-2 ">
                        <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                            <h3 className="text-2xl  text-lime-400 font-bold text-md mb-6">2. Tailored Cover Letters</h3>
                            <p className="text-lg"> Our AI crafts personalized, professional cover letters that align perfectly with the job description, highlighting your unique qualifications and standing out to employers.</p>
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2 mb-4 px-2 ">
                        <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                            <h3 className="text-2xl  text-lime-400 font-bold text-md mb-6">3. Accurate Salary Insights</h3>
                            <p className="text-lg">Get a detailed salary report based on job data, including experience requirements, location, and industry trends, ensuring you're well-prepared for negotiations.</p>
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2 mb-4 px-2 ">
                        <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                            <h3 className="text-2xl  text-lime-400 font-bold text-md mb-6">4. Resume Optimization for ATS</h3>
                            <p className="text-lg">Enhance your resume with AI-driven adjustments to meet job-specific ATS requirements, increasing your chances of landing an interview.</p>
                        </div>
                    </div>


                </div>
            </div>
            <h2 className="text-4xl text-lime-400 text-center mt-5 tracking-tight font-bold text-primary-800">Let Lead Genie transform job hunting into a seamless experience! </h2>  

        </div>
    )
}

export default Hero3
