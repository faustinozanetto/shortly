import React from 'react';
import UserDashboardGreeting from './greeting/user-dashboard-greeting';
import UserDashboardStats from './stats/user-dashboard-stats';
import { Session } from 'next-auth';
import UserDashboardURLs from './urls/user-dashboard-urls';

type UserDashboardProps = {
  session: Session;
};

const UserDashboard: React.FC<UserDashboardProps> = (props) => {
  const { session } = props;

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <UserDashboardGreeting session={session} />
      {/* @ts-expect-error Server Component */}
      <UserDashboardStats session={session} />
      {/* @ts-expect-error Server Component */}
      <UserDashboardURLs session={session} />
    </div>
  );
};

export default UserDashboard;
