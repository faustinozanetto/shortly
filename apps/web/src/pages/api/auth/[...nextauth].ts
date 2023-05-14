import { authOptions } from '@modules/auth/lib/auth.lib';
import NextAuth from 'next-auth/next';

export default NextAuth(authOptions);
