import clsx from 'clsx';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { InputWrapper, InputWrapperProps } from './input-wrapper';

type FileInputProps = Omit<InputWrapperProps, 'onInputReseted'> & {
  /** Name of the input */
  name: string;
  /** Optional: Wethet the input acceetps multiple files or not */
  multiple?: boolean;
  /** Optional: Type of files the input accepts. */
  accepts?: InputHTMLAttributes<HTMLInputElement>['accept'];
  /** Optional: Input onBlur handler */
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
  /**
   * Callback function called when the value changes.
   * @param value New value
   * @returns void.
   */
  onValueChanged: (files: File[]) => void;
  /**
   * Optional: Function to render the children using the current selected files.
   * @param files Current selected files.
   * @returns JSX Children
   */
  renderChildren?: (files: File[]) => JSX.Element | undefined;
};

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
  const {
    id,
    label,
    multiple = false,
    accepts = 'image/*',
    error = false,
    errorMessage,
    help = false,
    helpMessage,
    name,
    onBlur,
    onValueChanged,
    reseteable,
    renderChildren,
  } = props;

  const [inputValue, setInputValue] = useState<File[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.validity && event.target.files) {
      const files = Array.from(event.target.files);
      setInputValue(files);
    }
  };

  const handleInputReset = () => {
    setInputValue([]);
  };

  useEffect(() => {
    onValueChanged(inputValue);
  }, [inputValue]);

  return (
    <InputWrapper
      id={id}
      label={label}
      error={error}
      errorMessage={errorMessage}
      help={help}
      helpMessage={helpMessage}
      reseteable={reseteable}
      onInputReseted={handleInputReset}
    >
      <div className="flex w-full space-x-2">
        <input
          ref={ref}
          name={name}
          multiple={multiple}
          accept={accepts}
          type="file"
          className={clsx(
            'block w-full text-sm text-neutral-900 border border-neutral-300 rounded-lg cursor-pointer bg-neutral-50 dark:text-neutral-400 focus:outline-none dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400',
            'file:rounded-l-lg file:font-medium file:transition-colors file:text-neutral-900 file:dark:text-neutral-50 file:px-4 file:py-2 file:bg-primary-300 file:hover:bg-primary-400 file:focus-visible:ring-primary-300 file:dark:bg-primary-700 file:dark:hover:bg-primary-900 file:border-none file:cursor-pointer file:mr-2.5',
            error ? 'border-2 !border-red-600 dark:!border-red-400' : ''
          )}
          aria-invalid={error ? 'true' : 'false'}
          onChange={handleInputChange}
          onBlur={onBlur}
        />
        {renderChildren ? renderChildren(inputValue) : null}
      </div>
    </InputWrapper>
  );
});

FileInput.displayName = 'FileInput';
