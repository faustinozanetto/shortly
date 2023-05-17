import React from 'react';

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
    <div className="flex w-full flex-col items-start gap-1" ref={ref}>
      {label ? (
        <label htmlFor={id} className="block text-sm font-semibold text-neutral-900 dark:text-neutral-50 md:text-base">
          {label}
        </label>
      ) : null}
      {/* Input Wrapper Child Content */}
      <div className="relative flex w-full text-start">{children}</div>
      {/* Help Message */}
      {help ? <p className="mt-0.5 text-sm text-neutral-800 dark:text-neutral-300">{helpMessage}</p> : null}
      {/* Error Message */}
      {error ? (
        <p className="text-sm font-semibold text-red-600 dark:text-red-400" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
});

InputWrapper.displayName = 'InputWrapper';
