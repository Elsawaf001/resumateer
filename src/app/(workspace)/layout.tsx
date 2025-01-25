import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import Navbar from "./resumes/_components/Navbar"
import { auth } from "@clerk/nextjs/server";
import { isPremium } from "@/components/premuim/actions";
import { redirect } from "next/navigation";
import { Sub } from "@radix-ui/react-dropdown-menu";
import Subscribe from "./subscribe/subscribe";
import Footer from "@/components/home/sections/Footer";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const ispremium = await isPremium (userId);

  

 
    return (

    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-full px-5">
      <Navbar />
        <SidebarTrigger />
        {!ispremium && <Subscribe userId={userId} />}
        {ispremium && <> {children} </>}
        <Footer/>
      </main>
    </SidebarProvider>
  )
}

