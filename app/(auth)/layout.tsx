import AppSidebar from '@/components/app-sidebar';
import AuthNavigation from '@/components/auth-navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
                <AuthNavigation />
                <div className="p-5">{children}</div>
            </div>
        </SidebarProvider>
    );
};

export default layout;
