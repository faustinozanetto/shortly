import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';
import { BaseIconProps, iconVariants } from './base-icon';

export type ShortLinkIconProps = BaseIconProps;

const ShortLinkIcon = React.forwardRef<SVGSVGElement, ShortLinkIconProps>(({ className, size, ...props }, ref) => {
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
      <line x1="3" y1="12" x2="6" y2="12" />
      <line x1="12" y1="3" x2="12" y2="6" />
      <line x1="7.8" y1="7.8" x2="5.6" y2="5.6" />
      <line x1="16.2" y1="7.8" x2="18.4" y2="5.6" />
      <line x1="7.8" y1="16.2" x2="5.6" y2="18.4" />
      <path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
    </svg>
  );
});

ShortLinkIcon.displayName = 'ShortLinkIcon';

export default ShortLinkIcon;
