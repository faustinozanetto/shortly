'use client';
import { motion } from 'framer-motion';
import React from 'react';

type UserLinkStatsEntryProps = {
  label: string;
  count: number;
  total: number;
  renderIcon: () => JSX.Element;
};

const UserLinkStatsEntry: React.FC<UserLinkStatsEntryProps> = (props) => {
  const { label = 'Stat', total, count, renderIcon } = props;

  const capitalized = label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <div className="relative flex h-8 w-full items-center">
      <div className="z-10 flex w-full px-2">
        {renderIcon()}
        <p className="ml-2 text-sm font-bold">{capitalized}</p>

        <span className="ml-auto text-sm font-bold">{count}</span>
      </div>

      <motion.div
        style={{
          width: `${(count / (total || 0)) * 100}%`,
        }}
        className="bg-primary/50 absolute h-8 origin-left rounded border"
        transition={{ ease: 'easeOut', duration: 0.35 }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
      />
    </div>
  );
};

export default UserLinkStatsEntry;
