'use client';

import { signOut, useSession } from 'next-auth/react';

const LogoutButton = () => {
    const { status } = useSession();

    // While NextAuth is resolving session
    if (status === 'loading') return null;

    // Only show logout if user is logged in
    if (status !== 'authenticated') return null;

    return (
        <button
            onClick={() =>
                signOut({
                    callbackUrl: '/', // redirect after logout
                })
            }
            className="cursor-pointer rounded-md bg-red-500 px-4 py-1 text-white hover:bg-red-600 transition"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
