import { cn } from '@modules/ui/lib/ui.lib';
import React from 'react';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="w-full overflow-auto">
        <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
      </div>
    );
  }
);
Table.displayName = 'Table';

export default Table;
