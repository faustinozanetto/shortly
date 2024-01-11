import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';
import { BaseIconProps, iconVariants } from './base-icon';

export type QRIconProps = BaseIconProps;

const QRIcon = React.forwardRef<SVGSVGElement, QRIconProps>(({ className, size, ...props }, ref) => {
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
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <line x1="7" y1="17" x2="7" y2="17.01" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <line x1="7" y1="7" x2="7" y2="7.01" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <line x1="17" y1="7" x2="17" y2="7.01" />
      <line x1="14" y1="14" x2="17" y2="14" />
      <line x1="20" y1="14" x2="20" y2="14.01" />
      <line x1="14" y1="14" x2="14" y2="17" />
      <line x1="14" y1="20" x2="17" y2="20" />
      <line x1="17" y1="17" x2="20" y2="17" />
      <line x1="20" y1="17" x2="20" y2="20" />
    </svg>
  );
});

QRIcon.displayName = 'QRIcon';

export default QRIcon;
