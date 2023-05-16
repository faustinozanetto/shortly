import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0 ', className)} {...props} />
  )
);
TableCell.displayName = 'TableCell';

export default TableCell;
