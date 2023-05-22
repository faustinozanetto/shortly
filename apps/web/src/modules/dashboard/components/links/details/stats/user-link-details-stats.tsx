import React from 'react';
import UserLinkDetailsStatsBrowsers from './user-link-details-stats-browsers';
import UserLinkDetailsStatsOS from './user-link-details-stats-os';
import UserLinkDetailsStatsDevices from './user-link-details-stats-devices';

type UserLinkDetailsStatsProps = {
  alias: string;
};

const UserLinkDetailsStats = async (props: UserLinkDetailsStatsProps) => {
  const { alias } = props;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <UserLinkDetailsStatsBrowsers alias={alias} />
      <UserLinkDetailsStatsOS alias={alias} />
      <UserLinkDetailsStatsDevices alias={alias} />
    </div>
  );
};

export default UserLinkDetailsStats;
