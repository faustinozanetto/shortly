import React from 'react';

export type HomeStatsCardProps = {
  title: string;
  stat: string;
  unit: string;
  description: string;
};

const HomeStatsCard: React.FC<HomeStatsCardProps> = (props) => {
  const { title, stat, unit, description } = props;

  return (
    <div className="rounded-lg bg-neutral-50 p-3 shadow-lg transition-transform hover:scale-105 dark:bg-neutral-900 md:p-4">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-gray-200 sm:text-xl">{title} </h3>
      <span className="text-secondary-500 mt-2 text-4xl font-bold md:text-5xl">{`${stat}${unit}`}</span>
      <p className="mt-1 text-neutral-500">{description}</p>
    </div>
  );
};

export default HomeStatsCard;
