import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => {
    return <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
  }
);
TableBody.displayName = 'TableBody';

export default TableBody;
