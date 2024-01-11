import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';
import { BaseIconProps, iconVariants } from './base-icon';

export type SignInIconProps = BaseIconProps;

const SignInIcon = React.forwardRef<SVGSVGElement, SignInIconProps>(({ className, size, ...props }, ref) => {
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
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <path d="M20 12h-13l3 -3m0 6l-3 -3" />
    </svg>
  );
});

SignInIcon.displayName = 'SignInIcon';

export default SignInIcon;
