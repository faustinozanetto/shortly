import AuthSignIn from '@modules/auth/components/sign-in/auth-sign-in';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

const AuthSignInPage = () => {
  return (
    <div className="mx-4 flex w-full flex-col items-center md:mx-0">
      <AuthSignIn />
    </div>
  );
};

export default AuthSignInPage;
