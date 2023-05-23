'use client';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';
import { cn } from '@modules/ui/lib/ui.lib';
import { format } from 'date-fns';
import Button from '../button/button';
import Calendar from '../calendar/calendar';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './forms';

type DateInputProps = {
  label: string;
  description: string;
  value: Date | undefined;
  onChange: (value: unknown) => void;
};

export const DateInput: React.FC<DateInputProps> = (props, ref) => {
  const { label, description, value, onChange } = props;

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn('w-full pl-3 text-left font-normal', !value && 'text-muted-foreground')}
            >
              {value ? format(new Date(value), 'PPP') : <span>Pick a date</span>}
              <svg
                className="ml-auto h-5 w-5 stroke-neutral-900 dark:stroke-neutral-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="4" y="5" width="16" height="16" rx="2" />
                <line x1="16" y1="3" x2="16" y2="7" />
                <line x1="8" y1="3" x2="8" y2="7" />
                <line x1="4" y1="11" x2="20" y2="11" />
                <line x1="11" y1="15" x2="12" y2="15" />
                <line x1="12" y1="15" x2="12" y2="18" />
              </svg>
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={value} onSelect={onChange} />
        </PopoverContent>
      </Popover>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};

DateInput.displayName = 'Date Input';
