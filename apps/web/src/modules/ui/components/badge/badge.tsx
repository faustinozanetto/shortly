import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@modules/ui/lib/ui.lib';

const badgeVariants = cva(
  'inline-flex items-center border rounded-xl px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary-300 dark:bg-primary-600 hover:bg-primary-300/80 dark:hover:bg-primary-600/80 border-transparent text-neutral-900 dark:text-neutral-50',
        secondary:
          'bg-secondary-300 dark:bg-secondary-600 hover:bg-secondary-300/80 dark:hover:bg-secondary-600/80 border-transparent text-neutral-900 dark:text-neutral-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
