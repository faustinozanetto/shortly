import React from 'react';

const UserDashboardLinkCardPlaceholder = () => {
  return (
    <li className="bg-background relative flex flex-col items-start gap-2 rounded-lg border p-4 shadow-lg">
      <div className="flex w-full items-center gap-2">
        {/* Alias */}
        <div className="skeleton bg-skeleton h-5 w-40 animate-pulse rounded-md" />
        {/* QR Code */}
        <div className="skeleton bg-skeleton h-5 w-5 animate-pulse rounded-md" />
        {/* Copy */}
        <div className="skeleton bg-skeleton h-5 w-5 animate-pulse rounded-md" />
      </div>
      {/* Date */}
      <div className="skeleton bg-skeleton h-5 w-20 animate-pulse rounded-md" />
      {/* URL */}
      <div className="skeleton bg-skeleton h-5 w-60 animate-pulse rounded-md" />
    </li>
  );
};

export default UserDashboardLinkCardPlaceholder;
