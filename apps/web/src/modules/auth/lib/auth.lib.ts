import { NextAuthOptions, Session } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@shortly/database';

const COOKIES_PREFIX = 'shortly';

export const getSession = async (cookie: string): Promise<Session> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: 'database',
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...user,
        },
      };
    },
  },

  cookies: {
    sessionToken: {
      name: `${COOKIES_PREFIX}.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `${COOKIES_PREFIX}.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `${COOKIES_PREFIX}.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: `${COOKIES_PREFIX}.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    state: {
      name: `${COOKIES_PREFIX}.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
};
