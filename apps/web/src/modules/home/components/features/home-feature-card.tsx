import { HomeFeatureData } from '@modules/home/types/home.types';
import clsx from 'clsx';
import React from 'react';

export type HomeFeatureCardProps = {
  data: HomeFeatureData;
  isSelected: boolean;
  onClick: () => void;
};

const HomeFeatureCard: React.FC<HomeFeatureCardProps> = (props) => {
  const { data, isSelected, onClick } = props;
  const { title, content, icon } = data;

  return (
    <div
      className={clsx(
        'hover:bg-background-200 hover:dark:bg-background-800 flex items-start gap-4 rounded-md p-2 transition-all md:p-4',
        isSelected ? ' bg-background-200 dark:bg-background-800 shadow-lg' : ''
      )}
      role="button"
      onClick={onClick}
    >
      <div className={clsx('rounded-lg p-2', isSelected ? 'bg-secondary-400 dark:bg-secondary-800' : '')}>{icon}</div>
      <div>
        <h3
          className={clsx(
            'text-lg font-semibold md:text-xl',
            isSelected ? 'text-secondary-500' : 'text-neutral-900 dark:text-neutral-50'
          )}
        >
          {title}
        </h3>
        <p className="text-neutral-900 dark:text-neutral-50">{content}</p>
      </div>
    </div>
  );
};

export default HomeFeatureCard;
