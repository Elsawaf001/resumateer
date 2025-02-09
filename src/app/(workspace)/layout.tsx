import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import Navbar from "./resumes/_components/Navbar"
import { auth } from "@clerk/nextjs/server";


import Footer from "@/components/home/sections/Footer";
import prisma from "@/lib/prisma";
import Subscripe from "./subscription/Subscripe";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }
const subStatues = await prisma.subscription.findUnique(
  {
    where :{userId ,} ,
    select : {
      status : true
    }
  }
)

if (subStatues?.status === "TRIALING" || subStatues?.status === "ACTIVE" || subStatues?.status === "CANCELED" || !subStatues) {

    return  (

      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col w-full h-full px-5">
        <Navbar />
          <SidebarTrigger />
          {children}
          <Footer/>
        </main>
      </SidebarProvider>
    )




  }

  return (


      <main className="flex flex-col w-full h-full px-5">
      <Navbar />
        <Subscripe/>
        <Footer/>
      </main>

  )
}