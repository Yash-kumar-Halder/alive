import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = request.nextUrl;

    // Routes for unauthenticated users only
    const authPages = ['/sign-in', '/sign-up', '/verify'];

    // If user is already logged in and tries to visit auth pages then redirect to:
    if (token && authPages.includes(pathname)) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    // If user is not logged in and tries to visit protected pages - > Redirect to sign-in
    const protectedRoutes = ['/home', '/dashboard'];

    if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/sign-in', '/sign-up', '/verify', '/home', '/dashboard'],
};
