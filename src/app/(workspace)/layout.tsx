import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import Navbar from "./resumes/_components/Navbar"
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import SubscriptionLevelProvider from "@/app/(workspace)/SubscriptionLevelProvider";
import PremiumModal from "@/components/premuim/PremiumModal";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }
  const userSubscriptionLevel = await getUserSubscriptionLevel(userId);

  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>

    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-full px-5">
      <Navbar />
        <SidebarTrigger />
        {children}
        <PremiumModal userId={userId}/>
      </main>
    </SidebarProvider>
    </SubscriptionLevelProvider>
  )
}
