import React from 'react';

import { cn } from '@modules/ui/lib/ui.lib';
import { VariantProps, cva } from 'class-variance-authority';

export const iconButtonVariants = cva(
  'inline-flex appearance-none items-center justify-center relative whitespace-nowrap rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 transition-colors text-neutral-900 dark:text-neutral-50 disabled:cursor-not-allowed shadow-sm',
  {
    variants: {
      variant: {
        default:
          'bg-primary-300 hover:bg-primary-500/90 focus-visible:ring-primary-400 dark:bg-primary-700 dark:hover:bg-primary-900/90 text-white',
        outline:
          'border border-primary-300 dark:border-primary-600 hover:bg-primary-400 hover:border-primary-400 focus-visible:ring-primary-300 dark:hover:bg-primary-600 dark:focus-visible:ring-primary-500',
        ghost:
          'dark:border-primary-600 hover:bg-primary-500 hover:border-primary-400 focus-visible:ring-primary-300 dark:hover:bg-primary-800 dark:focus-visible:ring-primary-500',
        danger:
          'bg-red-300 hover:bg-red-500/90 focus-visible:ring-red-400 dark:bg-red-700 dark:hover:bg-red-900/90 text-white',
      },
      size: {
        xs: 'p-1',
        sm: 'p-2',
        base: 'p-2.5',
        lg: 'p-3',
        xl: 'text-lg px-7 py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
    },
  }
);

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonVariants> & {
    icon: React.ReactElement;
  };

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, variant, size, ...props }, ref) => {
    return (
      <button className={cn(iconButtonVariants({ variant, size, className }))} ref={ref} {...props}>
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
