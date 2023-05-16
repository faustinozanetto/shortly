import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          'h-12 px-4 text-left align-middle font-semibold text-neutral-900 dark:text-neutral-50 [&:has([role=checkbox])]:pr-0',
          className
        )}
        {...props}
      />
    );
  }
);
TableHead.displayName = 'TableHead';

export default TableHead;
