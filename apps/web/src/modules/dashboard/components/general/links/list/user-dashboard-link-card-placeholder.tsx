import React from 'react';

const UserDashboardLinkCardPlaceholder = () => {
  return (
    <li className="bg-background relative flex flex-col items-start gap-2 rounded-lg border p-4 shadow-lg">
      <div className="mb-1 flex w-full items-center gap-2">
        {/* Alias */}
        <span className="skeleton bg-foreground h-5 w-40 animate-pulse rounded-md"></span>
        {/* QR Code */}
        <span className="skeleton bg-foreground h-5 w-5 animate-pulse rounded-md"></span>
        {/* Copy */}
        <span className="skeleton bg-foreground h-5 w-5 animate-pulse rounded-md"></span>
      </div>
      {/* URL */}
      <span className="skeleton bg-foreground h-5 w-60 animate-pulse rounded-md"></span>
    </li>
  );
};

export default UserDashboardLinkCardPlaceholder;
