'use client';

import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

const LoginButton = () => {
    return (
        <div>
            <div onClick={() => signIn('google', { callbackUrl: '/home' })}>
                <Button className="h-fit py-0 bg-transparent hover:bg-transparent text-white hover:text-neutral-500 cursor-pointer">
                    Login
                </Button>
            </div>
        </div>
    );
};

export default LoginButton;
