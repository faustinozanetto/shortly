'use client';

import React from 'react';
import { motion } from 'framer-motion';

type LinkStatsListsEntryProps = {
  label: string;
  count: number;
  total: number;
  renderIcon: () => JSX.Element;
};

const LinkStatsListsEntry: React.FC<LinkStatsListsEntryProps> = (props) => {
  const { label = 'Stat', total, count, renderIcon } = props;

  const capitalized = label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <div className="relative flex h-8 w-full items-center">
      <div className="z-10 flex w-full px-2">
        {renderIcon()}
        <p className="ml-2 text-sm font-semibold">{capitalized}</p>
        <span className="ml-auto text-sm font-bold">{count}</span>
      </div>

      <motion.div
        style={{
          width: `${(count / (total || 0)) * 100}%`,
        }}
        className="bg-primary/40 absolute h-8 origin-left rounded"
        transition={{ ease: 'easeOut', duration: 0.35 }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
      />
    </div>
  );
};

export default LinkStatsListsEntry;
