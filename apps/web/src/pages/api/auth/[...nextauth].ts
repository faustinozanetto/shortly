import NextAuth from 'next-auth';
import { authOptions } from '@modules/auth/lib/auth.lib';

export default NextAuth(authOptions);
