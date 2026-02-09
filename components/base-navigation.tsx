import Link from 'next/link';
import LoginButton from './login-button';
import Logout from './logout-button';

const BaseNavigation = () => {
    return (
        <div className="w-1/2 h-8 fixed top-6 left-1/2 -translate-x-1/2 flex items-center justify-between bg-neutral-800 px-4 rounded shadow-sm">
            <div className="font-semibold">ALIVE</div>
            <div className="flex gap-4">
                <ul className="flex items-center gap-3 text-sm">
                    <li>
                        <Link href={'/home'}>Home</Link>
                    </li>
                    <li>
                        <Link href={'/docs'}>Docs</Link>
                    </li>
                    <li>
                        <Link href={'/contact'}>Contact</Link>
                    </li>
                    <li>
                        <Link href={'/support'}>Support</Link>
                    </li>
                </ul>
                <LoginButton />
                <Logout />
            </div>
        </div>
    );
};

export default BaseNavigation;
