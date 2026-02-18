import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Home, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

const AppSidebar = () => {
    const sidebarLinks = [
        {
            label: 'Home',
            href: '/home',
            icon: Home,
        },
        {
            label: 'Dashboard',
            href: '/dashboard',
            icon: LayoutDashboard,
        },
    ];

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarContent className="overflow-x-hidden px-0">
                    <SidebarGroup className="py-1">
                        <SidebarGroupContent>
                            <div className="flex items-center w-48 gap-2">
                                {/* <HeartPlusIcon size={18} /> */}
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    {/* <SidebarSeparator /> */}
                </SidebarContent>
            </SidebarHeader>
            <SidebarContent className="overflow-x-hidden">
                <SidebarGroup>
                    <SidebarGroupContent>
                        {sidebarLinks.map((link) => (
                            <SidebarMenuItem key={link.label}>
                                <Link href={link.href}>
                                    <SidebarMenuButton>
                                        <link.icon />
                                        {link.label}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
