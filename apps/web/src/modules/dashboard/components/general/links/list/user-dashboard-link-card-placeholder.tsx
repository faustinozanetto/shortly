import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import React from 'react';

const UserDashboardLinkCardPlaceholder: React.FC = () => {
  return (
    <li className="bg-background relative flex flex-col items-start gap-2 rounded border p-4 shadow">
      <div className="flex w-full items-center gap-2">
        {/* Alias */}
        <Skeleton className="h-5 w-44" />
        {/* QR Code */}
        <Skeleton className="h-5 w-5" />
        {/* Copy */}
        <Skeleton className="h-5 w-5" />
      </div>
      {/* Date */}
      <Skeleton className="h-5 w-20" />
      {/* URL */}
      <Skeleton className="h-5 w-60" />
    </li>
  );
};

export default UserDashboardLinkCardPlaceholder;
