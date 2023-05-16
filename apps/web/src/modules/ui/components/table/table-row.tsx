import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-b-neutral-200 transition-colors hover:bg-neutral-200/70 data-[state=selected]:bg-neutral-200 dark:border-b-neutral-700 dark:hover:bg-neutral-700/70',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

export default TableRow;
