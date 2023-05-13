import React from 'react';

import { InputWrapperContent } from './input-wrapper-content';

export type InputWrapperProps = {
  /** Id of the input */
  id: string;
  /** Optional: Label to display on top of the input */
  label?: string;
  /** Optional: Wether the input is invalid or not */
  error?: boolean;
  /** Optional: Error message to display when invalid */
  errorMessage?: string;
  /** Optional: Wether to show or not a help message */
  help?: boolean;
  /** Optional: Help message to display */
  helpMessage?: string;
  /** Children */
  children?: React.ReactNode;
};

export const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>((props, ref) => {
  const { id, label, error = false, errorMessage, help = false, helpMessage, children } = props;

  return (
    <div className="flex w-full flex-col items-start" ref={ref}>
      {label ? (
        <div className="mb-1.5 flex w-full flex-row items-center justify-between">
          {label ? (
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              {label}
            </label>
          ) : null}
        </div>
      ) : null}
      <InputWrapperContent error={error} errorMessage={errorMessage} help={help} helpMessage={helpMessage}>
        {children}
      </InputWrapperContent>
    </div>
  );
});

InputWrapper.displayName = 'InputWrapper';
