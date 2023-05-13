import React from 'react';

export type InputWrapperToggleProps = {
  /** Wether the input is invalid or not */
  error: boolean;
  /** Optional: Error message to display when invalid */
  errorMessage?: string;
  /** Optional: Wether to show or not a help message */
  help?: boolean;
  /** Optional: Help message to display */
  helpMessage?: string;
  /** Children */
  children?: React.ReactNode;
};

export const InputWrapperContent: React.FC<InputWrapperToggleProps> = (props) => {
  const { error, errorMessage, help, helpMessage, children } = props;

  return (
    <div className='relative w-full text-start'>
      {children}
      {help ? <p className="text-sm mt-0.5 text-neutral-800 dark:text-neutral-300">{helpMessage}</p> : null}
      {error ? (
        <p className="text-sm !text-red-600 dark:!text-red-400 font-medium" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
