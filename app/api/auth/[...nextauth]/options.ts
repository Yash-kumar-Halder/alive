import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import type { Account, Profile, Session } from 'next-auth';
import { connectToDB } from '@/db/connect-to-db';
import UserModel from '@/models/user.model';
import { JWT } from 'next-auth/jwt';

export const authConfig = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({
            user,
            account,
        }: {
            user: {
                name?: string | null;
                email?: string | null;
                image?: string | null;
            };
            account: Account | null;
            profile?: Profile;
        }) {
            if (!account) return false;

            if (account.provider !== 'google' && account.provider !== 'github') {
                return false;
            }

            await connectToDB();

            const existingUser = await UserModel.findOne({
                email: user.email,
            });

            if (!existingUser) {
                if (!user.email || !user.name || !user.image) {
                    return false;
                }

                await UserModel.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    authProvider: account.provider,
                    authProviderId: account.providerAccountId,
                    workspaces: [],
                });
                return true;
            }

            if (
                existingUser.authProvider !== account.provider ||
                existingUser.authProviderId !== account.providerAccountId
            ) {
                return false;
            }

            return true;
        },

        async jwt({ token }: { token: JWT }) {
            if (!token.email) return token;

            await connectToDB();

            const user = await UserModel.findOne({
                email: token.email,
            });

            if (user) {
                token.id = user._id.toString();
            }

            return token;
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user && token.id) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
};
