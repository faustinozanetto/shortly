import React from 'react';

type UserLinkStatsEntryProps = {
  label: string;
  count: number;
  renderIcon: () => JSX.Element;
};

const UserLinkStatsEntry: React.FC<UserLinkStatsEntryProps> = (props) => {
  const { label, count, renderIcon } = props;

  const capitalized = label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <div className="bg-primary-300/50 dark:bg-primary-500/50 flex items-center justify-between rounded-lg px-4 py-2 shadow-lg transition-transform hover:scale-105">
      <div className="relative z-10 flex w-full max-w-[calc(100%-3rem)] items-center">
        {renderIcon()}
        <p className="ml-2 text-sm font-bold text-neutral-900 dark:text-neutral-50">{capitalized}</p>
      </div>
      <span className="text-sm font-bold text-neutral-900 dark:text-neutral-50">{count}</span>
    </div>
  );
};

export default UserLinkStatsEntry;
