import React, { useEffect } from 'react';
import UserDashboardGreeting from './greeting/user-dashboard-greeting';
import UserDashboardStats from './stats/user-dashboard-stats';
import { getServerSession } from 'next-auth';
import { authOptions } from '@modules/auth/lib/auth.lib';

const UserDashboard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <UserDashboardGreeting session={session} />
      <UserDashboardStats session={session} />
    </div>
  );
};

export default UserDashboard;
