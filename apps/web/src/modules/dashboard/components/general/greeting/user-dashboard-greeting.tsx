import React from 'react';
import { Session } from 'next-auth';

type UserDashboardGreetingProps = {
  user: Session['user'];
};

const UserDashboardGreeting: React.FC<UserDashboardGreetingProps> = (props) => {
  const { user } = props;

  return (
    <div className="rounded border p-4 shadow md:p-6">
      <h1 className="leading-2 block text-xl font-bold md:text-2xl lg:text-3xl">👋 Welcome Back {user.name}</h1>
      <p className="mt-2">
        This is your personal dashboard where you can manage your shortened URLs and see the performance and engagement.
      </p>
    </div>
  );
};

export default UserDashboardGreeting;
