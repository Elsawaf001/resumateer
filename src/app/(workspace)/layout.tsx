import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import Navbar from "./resumes/_components/Navbar"
import { auth } from "@clerk/nextjs/server";
import { isPremium } from "@/components/premuim/actions";

import Footer from "@/components/home/sections/Footer";
import Subscribe from "./resumes/_components/Subscribe";
import prisma from "@/lib/prisma";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

//  const isValid = async () => {
//     // Check subscription status
//     const user = await prisma.user.findUnique({
//       where: { clerkUserId: userId },
//       include: { subscription: true }
//     })
    
//     if (!user?.subscription) {
//       // No subscription - redirect to pricing page
//       return false
//     }
    
//     const now = new Date()
    
//     if (user.subscription.status === 'TRIALING' && 
//         user.subscription.trialEnd && 
//         user.subscription.trialEnd < now) {
//       // Trial expired - update status and redirect
//       await prisma.subscription.update({
//         where: { id: user.subscription.id },
//         data: { status: 'EXPIRED' }
//       })
//       return false
//     }
    
//     if (!['ACTIVE', 'TRIALING'].includes(user.subscription.status)) {
//       // Subscription not active - redirect to billing
//       return false
//     }

//     return true
//  }

  const ispremium = await isPremium (userId);

  

 
    return (

    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-full px-5">
      <Navbar />
        <SidebarTrigger />
        {/* {!ispremium && <Subscribe userId={userId} />}
        {ispremium && <> {children} </>} */}
        {children}
        <Footer/>
      </main>
    </SidebarProvider>
  )
}

