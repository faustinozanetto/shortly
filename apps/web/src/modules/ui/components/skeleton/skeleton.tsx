import { cn } from '@modules/ui/lib/ui.lib';
import clsx from 'clsx';
import React from 'react';

type SkeletonProps = {
  loading: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const { loading, children, className } = props;

  return (
    <div
      ref={ref}
      className={cn(
        loading
          ? 'skeleton bg-background-300 dark:bg-background-700 animate-pulse cursor-default bg-clip-padding transition-all duration-200'
          : '',
        'z-10 w-fit rounded-lg',
        className
      )}
    >
      {children}
    </div>
  );
});

Skeleton.displayName = 'Skeleton';
