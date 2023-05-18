import StatsCard from '@modules/common/components/stats/stats-card';
import { getFormattedNumberIntoThousands } from '@modules/common/lib/common.lib';
import { getUserTotalLinkClicks, getUserTotalLinks } from '@modules/dashboard/lib/dashboard.lib';
import { UserDashboardStatsData } from '@modules/dashboard/types/dashboard.types';
import { Session } from 'next-auth';
import React from 'react';

type UserDashboardStatsProps = {
  user: Session['user'];
};

const UserDashboardStats = async (props: UserDashboardStatsProps) => {
  const { user } = props;

  const getUserStats = async (userEmail: string): Promise<UserDashboardStatsData> => {
    const totalLinks = await getUserTotalLinks({ userEmail });
    const totalClicks = await getUserTotalLinkClicks({ userEmail });
    const cplRate = (totalClicks / totalLinks) * 100;
    return {
      totalLinks,
      totalClicks,
      cplRate,
    };
  };

  const userStats = await getUserStats(user?.email!);

  const statsMap: Record<number, { stat: number; unit: string }> = {};
  statsMap[0] = {
    stat: getFormattedNumberIntoThousands(userStats.totalLinks)[0],
    unit: getFormattedNumberIntoThousands(userStats.totalLinks)[1],
  };
  statsMap[1] = {
    stat: getFormattedNumberIntoThousands(userStats.totalClicks)[0],
    unit: getFormattedNumberIntoThousands(userStats.totalClicks)[1],
  };
  statsMap[2] = {
    stat: userStats.cplRate,
    unit: '%',
  };

  return (
    <div className="bg-background-100 dark:bg-background-800 rounded-lg p-4 shadow-lg md:p-6">
      <h2 className="leading-2 block text-2xl font-bold text-neutral-800 dark:text-white md:text-3xl lg:text-4xl">
        Your Links Stats
      </h2>
      <p className="mt-2 text-neutral-800 dark:text-neutral-100 md:text-lg">
        This is your personal dashboard where you can manage your shortened URLs and see the performance and engagement.
      </p>

      {/* Stats Grid */}
      <div className="mt-2 grid grid-cols-2 gap-4 md:mt-4 md:grid-cols-3 md:items-center md:gap-8">
        <StatsCard
          title="Total Links"
          description="Total links created"
          stat={statsMap[0].stat}
          unit={statsMap[0].unit}
        />
        <StatsCard
          title="Total Clicks"
          description="Sum of all clicks"
          stat={statsMap[1].stat}
          unit={statsMap[1].unit}
        />
        <StatsCard
          title="CPL Rate"
          description="Click-Per-Link Rate"
          stat={statsMap[2].stat.toFixed(2)}
          unit={statsMap[2].unit}
        />
      </div>
    </div>
  );
};

export default UserDashboardStats;
