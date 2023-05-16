import React from 'react';

import { cn } from '@modules/ui/lib/ui.lib';
import { VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex appearance-none items-center justify-center relative whitespace-nowrap rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 transition-colors text-neutral-900 dark:text-neutral-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-primary-400 hover:bg-primary-500 focus-visible:ring-primary-400 dark:bg-primary-700 dark:hover:bg-primary-800 text-neutral-900 dark:text-neutral-50',
        outline:
          'border-2 border-primary-300 dark:border-primary-600 hover:bg-primary-500 hover:border-primary-400 focus-visible:ring-primary-300 dark:hover:bg-primary-800 dark:focus-visible:ring-primary-500',
        ghost:
          'dark:border-primary-600 hover:bg-primary-300/70 hover:border-primary-400 focus-visible:ring-primary-300 dark:hover:bg-primary-800/70 dark:focus-visible:ring-primary-500',
      },
      size: {
        sm: 'px-4 py-1.5',
        base: 'px-6 py-2',
        lg: 'px-6.5 py-2.5',
        xl: 'text-lg px-7 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: JSX.Element | null;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, icon, children, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {icon ? <span className="mr-2">{icon}</span> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
