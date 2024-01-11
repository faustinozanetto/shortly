import React from 'react';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';

const UserLinkStatsEntryPlaceholder: React.FC = () => {
  return (
    <div className="flex w-full gap-1">
      <Skeleton className="h-5 w-5" />
      <Skeleton className="h-5 w-full" />
    </div>
  );
};

export default UserLinkStatsEntryPlaceholder;
