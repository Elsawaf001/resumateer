import FeatureCard from "@/components/home/common/FeatureCard";
import Tag from "@/components/home/common/Tag";
import avatar1 from "@/assets/images/avatar-ashwin-santiago.jpg";
import avatar3 from "@/assets/images/avatar-florence-shaw.jpg";
import avatar2 from "@/assets/images/avatar-lula-meyers.jpg";


import Image from "next/image";
import Avatar from "@/components/home/common/Avatar";
import Key from "@/components/home/common/Key";


const features = [
    "CV Builder",
    "AI CV Builder",
    "Cover Letter Creator",
    "CV Optimization per Job Description",
    "Job Leads",
    "Salary Estimate Report",
    "ATS Enhancement",
  ];
  
  export default function Features() {
    return (
      <section className="py-24">
        <div className="container">
          <div className="flex justify-center">
            <span className="bg-lime-400 text-neutral-900 font-bold px-3 py-1.5 rounded-full uppercase text-sm">
              Features
            </span>
          </div>
  
          <h2 className="text-6xl font-medium max-w-2xl mx-auto text-center mt-6">
            Everything you need for your <span className="text-lime-400">career success</span>
          </h2>
  
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
            {/* Empty grid structure for layout purposes */}
          </div>
  
          <div className="mt-8 flex flex-wrap gap-3 justify-center group">
            {features.map((feature) => (
              <div
                key={feature}
                className="bg-neutral-900 border-white/100 inline-flex 
                          px-3 md:px-5 py-1.5 md:py-2 rounded-2xl gap-3 items-center
                          hover:scale-110 transition duration-500"
              >
                <span
                  className="bg-lime-400 text-neutral-950 size-5 rounded-full inline-flex items-center justify-center text-xl group-hover:rotate-45 transition duration-500"
                >
                  &#10038;
                </span>
                <span className="font-medium md:text-lg">{feature}</span>
              </div>
            ))}
            
          </div>
        </div>
      </section>
    );
  }