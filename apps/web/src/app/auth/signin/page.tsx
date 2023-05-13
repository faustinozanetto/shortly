import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Shortly',
  description: 'Shortly is a free and easy to use url shortner.',
};

const AuthSignInPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Sign In</h1>
    </div>
  );
};

export default AuthSignInPage;
