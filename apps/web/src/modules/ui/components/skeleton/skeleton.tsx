import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-primary/10 animate-pulse rounded', className)} {...props} />;
}

export { Skeleton };
