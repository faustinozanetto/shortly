import React from 'react';

import { cn } from '@modules/ui/lib/ui.lib';
import { VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 ring-offset-background disabled:hover:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-primary-400 hover:bg-primary-500 focus-visible:ring-primary-400 dark:bg-primary-700 dark:hover:bg-primary-800 text-neutral-900 dark:text-neutral-50',
        outline:
          'border border-primary-300 dark:border-primary-600 hover:bg-primary-500 hover:border-primary-400 focus-visible:ring-primary-300 dark:hover:bg-primary-800 dark:focus-visible:ring-primary-500 text-neutral-900 dark:text-neutral-50',
        ghost:
          'dark:border-primary-600 hover:bg-primary-300/70 hover:border-primary-400 focus-visible:ring-primary-300 dark:hover:bg-primary-800/70 dark:focus-visible:ring-primary-500',
        danger:
          'bg-red-300 hover:bg-red-400 focus-visible:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700 text-neutral-900 dark:text-neutral-50',
        unstyled: '',
      },
      size: {
        xs: 'text-xs h-6 px-2 md:text-sm',
        sm: 'h-8 px-3',
        base: 'h-9 md:h-10 px-4',
        lg: 'h-12 px-8',
        xl: 'h-12 px-8 md:h-14 md:px-10',
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
  ({ className, type = 'button', icon, children, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} type={type} {...props}>
        {icon ? <span className="mr-2">{icon}</span> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
