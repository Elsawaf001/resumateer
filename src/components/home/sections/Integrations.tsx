import Tag from "@/components/home/common/Tag";
import figmaIcon from "@/assets/images/figma-logo.svg";
import notionIcon from "@/assets/images/notion-logo.svg";
import slackIcon from "@/assets/images/slack-logo.svg";
import relumeIcon from "@/assets/images/relume-logo.svg";
import framerIcon from "@/assets/images/framer-logo.svg";
import githubIcon from "@/assets/images/github-logo.svg";
import Image from "next/image";
import IntegrationsColumn from "@/components/home/common/IntegrationsColumn";
import { reverse } from "dns";

const integrations = [
    { name: "Figma", icon: figmaIcon, description: "Figma is a collaborative interface design tool." },
    { name: "Notion", icon: notionIcon, description: "Notion is an all-in-one resumes for notes and docs." },
    { name: "Slack", icon: slackIcon, description: "Slack is a powerful team communication platform." },
    { name: "Relume", icon: relumeIcon, description: "Relume is a no-code website builder and design system." },
    { name: "Framer", icon: framerIcon, description: "Framer is a professional website prototyping tool." },
    { name: "GitHub", icon: githubIcon, description: "GitHub is the leading platform for code collaboration." },
];
export type IntegrationsType = typeof integrations ;

export default function Integrations() {
    return (
    <section className="py-24 overflow-hidden">
        <div className="container">

            <div className="grid lg:grid-cols-2 items-center lg:gap-16">

                

                <div>
                    <Tag>Integrations</Tag>
                    <h2 className="text-6xl mt-6 font-medium  ">Land Your Dream Job at  <span className="text-lime-400">Giant Tech</span></h2>
                    <p className="text-white/50 mt-4 text-lg">create professional resumes and cover letters, optimize them for ATS (Applicant Tracking System) compliance, and tailor their applications to specific job descriptions. With AI-powered tools, you can easily build, enhance, and customize your CV to stand out from the competition.</p>

                </div>



                <div>
                    <div className="h-[400px] lg:h-[800px] grid md:grid-cols-2 gap-4 mt-8 lg:mt-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                     <IntegrationsColumn integrations={integrations}/>
                    <IntegrationsColumn integrations={integrations.slice().reverse() } reverse className="hidden md:flex"/>
                </div>


                </div>




            </div>
            
         





        </div>
    </section>
    );
}
