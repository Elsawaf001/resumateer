import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import Navbar from "./resumes/_components/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-full px-5">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
