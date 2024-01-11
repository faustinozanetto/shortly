import React from 'react';
import UserDashboardGreeting from './greeting/user-dashboard-greeting';
import UserDashboardStats from './stats/user-dashboard-stats';
import { Session } from 'next-auth';
import UserDashboardURLs from './links/user-dashboard-links';

type UserDashboardProps = {
  user: Session['user'];
};

const UserDashboard: React.FC<UserDashboardProps> = (props) => {
  const { user } = props;

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <UserDashboardGreeting user={user} />
      {/* @ts-expect-error Server Component */}
      <UserDashboardStats user={user} />
      <UserDashboardURLs />
    </div>
  );
};

export default UserDashboard;
