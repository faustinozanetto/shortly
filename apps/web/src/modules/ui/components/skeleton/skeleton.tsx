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
      className={clsx(
        loading
          ? 'skeleton animate-pulse cursor-default bg-neutral-300 bg-clip-padding transition-all duration-200 dark:bg-neutral-700'
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
