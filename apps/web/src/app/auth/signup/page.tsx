import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Shortly',
  description: 'Shortly is a free and easy to use url shortner.',
};

const AuthSignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Sign Up</h1>
    </div>
  );
};

export default AuthSignUpPage;
