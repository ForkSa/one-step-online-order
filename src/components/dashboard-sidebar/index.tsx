import { Home } from "lucide-react"

import { Link } from "react-router"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import LogoImage from "@/assets/images/logo.svg"

export default function DashboardSidebar() {
    return (
        <Sidebar dir="rtl" side="right">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarHeader className="py-6">
                        <img src={LogoImage} alt="Logo" className="w-24 mx-auto" />
                    </SidebarHeader>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            <SidebarMenuItem className="flex items-center gap-x-2">
                                <Home className="size-6 stroke-primary" />
                                <SidebarMenuButton asChild>
                                    <Link to="/">الرئيسية</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
