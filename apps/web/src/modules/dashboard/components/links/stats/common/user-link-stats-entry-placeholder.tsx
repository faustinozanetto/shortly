'use client';
import React from 'react';

const UserLinkStatsEntryPlaceholder: React.FC = () => {
  return (
    <div className="flex w-full gap-2">
      <div className="skeleton bg-skeleton h-6 w-6 animate-pulse rounded-md" />
      <div className="skeleton bg-skeleton h-6 w-full animate-pulse rounded-md" />
    </div>
  );
};

export default UserLinkStatsEntryPlaceholder;
