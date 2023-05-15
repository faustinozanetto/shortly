import { getUserTotalLinks } from '@modules/dashboard/lib/dashboard.lib';
import { UserDashboardStatsData } from '@modules/dashboard/types/dashboard.types';
import { Session } from 'next-auth';
import React from 'react';

type UserDashboardStatsProps = {
  session: Session;
};

const UserDashboardStats = async (props: UserDashboardStatsProps) => {
  const { session } = props;
  const userTotalLinks = await getUserTotalLinks({ userId: session.user.id });

  const userStats: UserDashboardStatsData = {
    totalLinks: userTotalLinks,
  };
  return (
    <div className="rounded-lg bg-neutral-100 p-4 shadow-lg dark:bg-neutral-800 md:p-6">
      <h2 className="leading-2 block text-2xl font-bold text-neutral-800 dark:text-white md:text-3xl lg:text-4xl">
        Your Links Stats
      </h2>
      <p className="mt-2 text-neutral-800 dark:text-neutral-100 md:text-lg">
        This is your personal dashboard where you can manage your shortened URLs and see the performance and engagement.
      </p>
    </div>
  );
};

export default UserDashboardStats;
