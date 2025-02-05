import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,

  SidebarHeader,
  SidebarMenu,
 
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "@/components/Logo"
import Link from "next/link"
import { Card, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import SubscriptionManager from "@/components/premuim/paypal/SubscriptionManager"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { getSubscription } from "@/components/premuim/paypal/actions"



export async function AppSidebar() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }
// const sub = await getSubscription(userId)
 
  return (
    <Sidebar>
      <SidebarHeader><Logo /></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              
                <SidebarMenuItem  className="py-3">
                  
                    <Link href={"/resumes"} className="flex items-center gap-3 " >
                    <Card className="w-full gap-3 hover:bg-gray-800">
                      <CardHeader>
                      <span className={cn("text-2xl font-extrabold px-3 py-3 font-sans text-lime-400") }>
                       Resumes
                      

                      </span>

                      </CardHeader>
                    </Card>
                    </Link>
                  
                </SidebarMenuItem>
             <SidebarMenuItem>

             <Link href={"/lead"} className="flex items-center gap-3 " >
                    <Card className="w-full hover:bg-gray-800">
                      <CardHeader>
                      <span className={cn("text-2xl font-muted-forgrount px-3 py-3 font-sans text-lime-400")}>Leads</span>

                      </CardHeader>
                    </Card>
                    </Link>
             </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
<SidebarFooter>
{/* <SubscriptionManager  userId={userId} sub={sub} /> */}
</SidebarFooter> 

    </Sidebar>
  )
}
