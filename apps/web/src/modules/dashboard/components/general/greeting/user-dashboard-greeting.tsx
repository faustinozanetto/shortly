import React from 'react';
import { Session } from 'next-auth';

type UserDashboardGreetingProps = {
  user: Session['user'];
};

const UserDashboardGreeting: React.FC<UserDashboardGreetingProps> = (props) => {
  const { user } = props;

  return (
    <div className="bg-foreground rounded-lg border p-4 shadow-lg md:p-6">
      <h1 className="leading-2 block text-2xl font-bold text-neutral-800 dark:text-white md:text-3xl lg:text-4xl">
        👋 Welcome Back {user.name}
      </h1>
      <p className="mt-2 text-neutral-800 dark:text-neutral-100 md:text-lg">
        This is your personal dashboard where you can manage your shortened URLs and see the performance and engagement.
      </p>
    </div>
  );
};

export default UserDashboardGreeting;
