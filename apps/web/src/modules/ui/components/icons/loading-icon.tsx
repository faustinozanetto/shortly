import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';
import { BaseIconProps, iconVariants } from './base-icon';

export type LoadingIconProps = BaseIconProps;

const LoadingIcon = React.forwardRef<SVGSVGElement, LoadingIconProps>(({ className, size, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      className={cn(iconVariants({ size }), 'animate-spin stroke-current', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="12" y1="6" x2="12" y2="3" />
      <line x1="16.25" y1="7.75" x2="18.4" y2="5.6" />
      <line x1="18" y1="12" x2="21" y2="12" />
      <line x1="16.25" y1="16.25" x2="18.4" y2="18.4" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="7.75" y1="16.25" x2="5.6" y2="18.4" />
      <line x1="6" y1="12" x2="3" y2="12" />
      <line x1="7.75" y1="7.75" x2="5.6" y2="5.6" />
    </svg>
  );
});

LoadingIcon.displayName = 'LoadingIcon';

export default LoadingIcon;
