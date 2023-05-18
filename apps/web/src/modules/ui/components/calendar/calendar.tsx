'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { buttonVariants } from '../button/button';
import { cn } from '@modules/ui/lib/ui.lib';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar: React.FC<CalendarProps> = (props) => {
  const { className, classNames, showOutsideDays = true, ...rest } = props;
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full space-y-1',
        head_row: 'flex',
        head_cell: 'text-neutral-900 dark:text-neutral-50 w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(buttonVariants({ variant: 'ghost' }), 'h-9 w-9 font-normal aria-selected:opacity-100'),
        day_selected:
          'bg-primary-300 dark:bg-primary-900 text-neutral-900 dark:text-neutral-50 hover:bg-primary-300 dark:hover:bg-primary-600 focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-secondary-300 text-accent-foreground dark:bg-secondary-900',
        day_outside: 'text-neutral-900 dark:text-neutral-50 opacity-50',
        day_disabled: 'text-neutral-900 dark:text-neutral-50 opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <svg
            className="h-4 w-4 stroke-neutral-900 dark:stroke-neutral-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="15 6 9 12 15 18" />
          </svg>
        ),
        IconRight: () => (
          <svg
            className="h-4 w-4 stroke-neutral-900 dark:stroke-neutral-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="9 6 15 12 9 18" />
          </svg>
        ),
      }}
      {...rest}
    />
  );
};
Calendar.displayName = 'Calendar';

export default Calendar;
