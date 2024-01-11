import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';
import { BaseIconProps, iconVariants } from './base-icon';

export type GoogleIconProps = BaseIconProps;

const GoogleIcon = React.forwardRef<SVGSVGElement, GoogleIconProps>(({ className, size, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      className={cn(iconVariants({ size }), 'stroke-current', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
    </svg>
  );
});

GoogleIcon.displayName = 'GoogleIcon';

export default GoogleIcon;
