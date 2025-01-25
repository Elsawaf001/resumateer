import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import Navbar from "./resumes/_components/Navbar"
import { auth } from "@clerk/nextjs/server";
import { isOpen } from "@/components/premuim/actions";
import { redirect } from "next/navigation";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const ispremium = await isOpen(userId);

  if(ispremium){
    redirect("/subscribe")
  }

  else { 
    return (

    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-full px-5">
      <Navbar />
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
}
