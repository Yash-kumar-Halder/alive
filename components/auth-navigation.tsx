import { SidebarTrigger } from '@/components/ui/sidebar';
import ProfileMenu from './profile-menu';

const AuthNavigation = () => {
    return (
        <div className="w-full h-12 flex items-center justify-between px-3 pr-8 border-b">
            <div className="flex gap-2 items-center">
                <SidebarTrigger />
                <h3>Logo</h3>
            </div>
            <ProfileMenu />
        </div>
    );
};

export default AuthNavigation;
