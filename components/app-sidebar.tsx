import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
} from '@/components/ui/sidebar';
import { HeartPlusIcon } from 'lucide-react';

const AppSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarContent className="overflow-x-hidden">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <div className="flex w-48 gap-2">
                                <HeartPlusIcon size={18} />
                                <h1>ALIVE</h1>
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </SidebarHeader>
        </Sidebar>
    );
};

export default AppSidebar;
