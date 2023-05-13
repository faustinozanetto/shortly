import React from 'react';
import { Button } from '../button/button';
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
  /** Optional: Wetheer the input can be resetted or not */
  reseteable?: boolean;
  /** Optional: Reset callback function */
  onInputReseted?: () => void;
  /** Children */
  children?: React.ReactNode;
};

export const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>((props, ref) => {
  const {
    id,
    label,
    error = false,
    errorMessage,
    help = false,
    helpMessage,
    reseteable = false,
    onInputReseted,
    children,
  } = props;

  return (
    <div className="flex flex-col items-start w-full" ref={ref}>
      {label || reseteable ?
        <div className="flex flex-row items-center justify-between w-full mb-1.5">
          {label ?
            <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
              {label}
            </label> : null}
          {reseteable ? (
            <Button size="sm" variant="ghost" aria-label="Reset Input" colorScheme="danger" onClick={onInputReseted}>
              Reset
            </Button>
          ) : null}
        </div> : null}
      <InputWrapperContent
        error={error}
        errorMessage={errorMessage}
        help={help}
        helpMessage={helpMessage}
      >
        {children}
      </InputWrapperContent>
    </div>
  );
});

InputWrapper.displayName = 'InputWrapper';
