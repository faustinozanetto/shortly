import React from 'react';
import UserLinkStatsBrowsers from './user-link-stats-browsers';
import UserLinkStatsOS from './user-link-stats-os';
import UserLinkStatsDevices from './user-link-stats-devices';
import UserLinkStatsCountries from './user-link-stats-countries';

const UserLinkStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <UserLinkStatsBrowsers />
      <UserLinkStatsOS />
      <UserLinkStatsDevices />
      <UserLinkStatsCountries />
    </div>
  );
};

export default UserLinkStats;
