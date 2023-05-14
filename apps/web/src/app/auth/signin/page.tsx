import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

const AuthSignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Sign In</h1>
    </div>
  );
};

export default AuthSignInPage;
