'use client';
import React, { useEffect, useState } from 'react';
import { InputWrapper, InputWrapperProps } from './input-wrapper';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';
import { cn } from '@modules/ui/lib/ui.lib';
import { format } from 'date-fns';
import Button from '../button/button';
import Calendar from '../calendar/calendar';
import { DayFocusEventHandler } from 'react-day-picker';

type DateInputProps = Omit<InputWrapperProps, 'onInputReseted'> & {
  /** Optional: Additional input classnames */
  className?: string;
  /** Value of the input */
  value: Date | undefined;
  /** Optional: Show an icon in the input field */
  icon?: React.ReactElement;
  /** Optional: Input onBlur handler */
  onBlur?: DayFocusEventHandler;
  /**
   * Callback function called when the value changes.
   * @param value New value
   * @returns void.
   */
  onValueChanged: (value: Date) => void;
};

export const DateInput: React.FC<DateInputProps> = (props, ref) => {
  const {
    id,
    value,
    label,
    error = false,
    errorMessage,
    help = false,
    helpMessage,
    icon,
    onBlur,
    required,
    onValueChanged,
  } = props;

  const [inputValue, setInputValue] = useState<Date | undefined>(value);

  useEffect(() => {
    if (inputValue) onValueChanged(inputValue);
  }, [inputValue]);

  return (
    <InputWrapper
      id={id}
      label={label}
      required={required}
      error={error}
      errorMessage={errorMessage}
      help={help}
      helpMessage={helpMessage}
    >
      {icon ? <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div> : null}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            variant="unstyled"
            className={cn(
              'dark:bg-background-900 dark:text-neutral-20 w-full justify-start rounded-md border-2 border-neutral-200 bg-white px-4 text-sm font-normal text-neutral-900 dark:border-neutral-700 dark:text-neutral-200',
              !inputValue && 'text-muted-foreground'
            )}
          >
            <svg
              className="mr-2 h-5 w-5 stroke-neutral-900 dark:stroke-neutral-50"
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
            {inputValue ? format(new Date(inputValue), 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={inputValue} onSelect={setInputValue} onDayBlur={onBlur} initialFocus />
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
};

DateInput.displayName = 'Date Input';
