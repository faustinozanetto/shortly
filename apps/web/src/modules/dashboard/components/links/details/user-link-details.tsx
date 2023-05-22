import React from 'react';

import UserLinkDetailsAlias from './user-link-details-alias';
import UserLinkManagement from '../management/user-link-management';

const UserLinkDetails = () => {
  return (
    <div className="bg-background-100 dark:bg-background-800 flex flex-col gap-4 rounded-lg p-4 shadow-lg md:flex-row md:justify-between md:p-6">
      <div>
        <h1 className="leading-2 block text-3xl font-bold text-neutral-800 dark:text-white md:text-4xl">
          Link Details
        </h1>
        <UserLinkDetailsAlias />
      </div>
      <UserLinkManagement />
    </div>
  );
};

export default UserLinkDetails;
