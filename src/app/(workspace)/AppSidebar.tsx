import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "@/components/Logo"
import UserCard from "@/components/UserCard"
import Link from "next/link"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { Description } from "@radix-ui/react-toast"
import FeatureCard from "@/components/home/common/FeatureCard"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  
  return (
    <Sidebar>
      <SidebarHeader><Logo /></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              
                <SidebarMenuItem  className="py-3">
                  
                    <Link href={"/resumes"} className="flex items-center gap-3 ">
                    <Card className="w-full gap-3 hover:bg-gray-800">
                      <CardHeader>
                      <span className={cn("text-2xl font-extrabold px-3 py-3 font-sans text-lime-400") }>My Resumes</span>

                      </CardHeader>
                    </Card>
                    </Link>
                  
                </SidebarMenuItem>
             <SidebarMenuItem>

             <Link href={"/lead"} className="flex items-center gap-3 " >
                    <Card className="w-full hover:bg-gray-800">
                      <CardHeader>
                      <span className={cn("text-2xl font-muted-forgrount px-3 py-3 font-sans text-lime-400")}>Leads (Soon)</span>

                      </CardHeader>
                    </Card>
                    </Link>
             </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter><UserCard /></SidebarFooter>

    </Sidebar>
  )
}
