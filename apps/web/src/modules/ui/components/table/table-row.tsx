import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'hover:bg-background-200/70 data-[state=selected]:bg-background-200 dark:hover:bg-background-700/70 border-b border-b-neutral-200 transition-colors dark:border-b-neutral-700',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

export default TableRow;
