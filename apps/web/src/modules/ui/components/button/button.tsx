import React from 'react';

import { cn } from '@modules/ui/lib/ui.lib';
import { VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex appearance-none items-center justify-center relative whitespace-nowrap rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 transition-colors text-neutral-900 dark:text-neutral-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-primary-500 hover:bg-primary-500/90 focus-visible:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-900/90 text-white',
        outline:
          'border-2 border-primary-300 dark:border-primary-600 hover:bg-primary-400 hover:border-primary-400 focus-visible:ring-primary-300 dark:hover:bg-primary-600 dark:focus-visible:ring-primary-500',
      },
      size: {
        sm: 'text-sm px-4 py-2 leading-4',
        base: 'px-6 py-3',
        lg: 'px-6.5 py-3.5',
        xl: 'text-lg px-7 py-4',
        '2xl': 'text-xl px-8 py-3 md:py-4 md:text-2xl md:px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
