import FeatureCard from "@/components/home/common/FeatureCard";
import Tag from "@/components/home/common/Tag";
import avatar1 from "@/assets/images/avatar-ashwin-santiago.jpg";
import avatar3 from "@/assets/images/avatar-florence-shaw.jpg";
import avatar2 from "@/assets/images/avatar-lula-meyers.jpg";
import avatar4 from "@/assets/images/avatar-owen-garcia.jpg";

import Image from "next/image";
import Avatar from "@/components/home/common/Avatar";
import Key from "@/components/home/common/Key";



const features = [
    "Asset Library",
    "Code Preview",
    "Flow Mode",
    "Smart Sync",
    "Auto Layout",
    "Fast Search",
    "Smart Guides",
];

export default function Features() {
    return (
    <section className="py-24">
        <div className="container">

        <div className="flex justify-center"><Tag>Features</Tag></div>
            

            <h2 className="text-6xl font-medium max-w-2xl mx-auto text-center mt-6">Where power meets <span className="text-lime-400">simplicity</span></h2>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8 ">
                <FeatureCard title={"Real-time Collaboration"} className="md:col-span-2 lg:col-span-1 group" description={"Work together seamlessly with conflict free editing"}>
                    <div className="aspect-video flex items-center justify-center">

                    <Avatar className="z-40">
                        <div><Image src={avatar1} alt="avatar" className="rounded-full"/></div>
                    </Avatar>
                    <Avatar className="-ml-6 border-indigo-500 z-30">
                        <div><Image src={avatar2} alt="avatar" className="rounded-full"/></div>
                    </Avatar>
                    <Avatar className="-ml-6 z-20 border-amber-500">
                        <div><Image src={avatar3} alt="avatar" className="rounded-full" /></div>
                    </Avatar>
                    <Avatar className="-ml-6 border-transparent group-hover:border-green-500 transition">
                        <div className="size-full bg-neutral-500 relative rounded-full inline-flex items-center justify-center gap-1">
                            <Image 
                            className="absolute size-full rounded-full opacity-0 group-hover:opacity-100 transition"
                            src={avatar4} 
                            alt={"avatar 4"}/>
                            {Array.from({length : 3}).map((_,i)=> (
                                <span className="size-1.5 rounded-full bg-white inline-flex" key={i}></span>
                            ))}
                            

                        </div>
                    </Avatar>

                    </div>
                    
                </FeatureCard>



                <FeatureCard title={"Interactive Prototyping"} 
                className="md:col-span-2 lg:col-span-1 group" 
                description={"Engage your clients with prototypes that react to user actions"} >
                    <div className="aspect-video flex items-center justify-center">
                    <p className="text-4xl font-extrabold text-center text-white/20 group-hover:text-white/10 transition">
                         We&apos;ve achieved {" "}
                         <span className="bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent relative">
                           <span>incredible</span> 
                           <video src="/assets/gif-incredible.mp4" 
                           autoPlay muted loop playsInline 
                           className="absolute bottom-full left-1/2 -translate-x-1/2 rounded-2xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition duration-500"/>
                            </span> {" "}
                             growth this year</p>
                    </div>
                </FeatureCard>


                 <FeatureCard title={"Keyboard Quick Actions"} className="md:col-span-2 md:col-strat-2 lg:col-span-1 lg-col-start-2 group" description={"Powerfull Commands to help you create designs more quickly<"} >

                <div className="aspect-video flex items-center justify-center gap-4">
                    <Key className="w-28 outline  outline-2 outline-offset-4 outline-transparent group-hover:outline-lime-400 transition-all group-hover:translate-y-1 duration-500">shift</Key>
                    <Key className="outline  outline-2 outline-offset-4 outline-transparent group-hover:outline-lime-400 transition-all delay-150 duration-500 group-hover:translate-y-1">alt</Key>
                    <Key className=" outline outline-2 outline-offset-4 outline-transparent group-hover:outline-lime-400 transition-all delay-300 duration-500 group-hover:translate-y-1">C</Key>

                </div>

                </FeatureCard> 
            

               
    
              


               



            </div>
    
    
            <div className="mt-8 flex flex-wrap gap-3 justify-center group">
                    {features.map( feature =>(
                        <div key={feature} 
                        className="bg-neutral-900 border-white/100 inline-flex 
                        px-3 md:px-5 py-1.5 md:py-2 rounded-2xl gap-3 items-center
                        hover:scale-110 transition duration-500
                        ">

                            <span className="bg-lime-400 text-neutral-950 size-5 rounded-full inline-flex items-center justify-center text-xl group-hover:rotate-45 transition duration-500">&#10038;</span>
                            <span className="font-medium md:text-lg">{feature}</span>

                        </div>
                    ))}
                </div>
    
    
       </div>
    </section>
    );
}
