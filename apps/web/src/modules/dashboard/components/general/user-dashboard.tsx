import React from 'react';
import UserDashboardGreeting from './greeting/user-dashboard-greeting';
import UserDashboardStats from './stats/user-dashboard-stats';
import { Session } from 'next-auth';
import UserDashboardURLs from './links/user-dashboard-links';
import { getUserLinks } from '@modules/dashboard/lib/dashboard.lib';
import UserDashboardLinksProvider from '@modules/dashboard/context/links/user-dashboard-links-context';

type UserDashboardProps = {
  user: Session['user'];
};

const UserDashboard = async (props: UserDashboardProps) => {
  const { user } = props;

  const links = (await getUserLinks({ userEmail: user.email! })).slice(0, 10);

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <UserDashboardGreeting user={user} />
      {/* @ts-expect-error Server Component */}
      <UserDashboardStats user={user} />

      <UserDashboardLinksProvider>
        <UserDashboardURLs links={links} />
      </UserDashboardLinksProvider>
    </div>
  );
};

export default UserDashboard;
