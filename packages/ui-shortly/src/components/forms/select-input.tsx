import clsx from 'clsx';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { InputWrapper, InputWrapperProps } from './input-wrapper';

type SelectInputProps = Omit<InputWrapperProps, 'onInputReseted'> & {
  value: InputHTMLAttributes<HTMLSelectElement>['value'];
  /** Name of the input */
  name: string;
  /** Optional: Input placeholder */
  placeholder?: InputHTMLAttributes<HTMLSelectElement>['placeholder'];
  /** Optional: Input type */
  type?: InputHTMLAttributes<HTMLSelectElement>['type'];
  /** Optional: Input onBlur handler */
  onBlur?: InputHTMLAttributes<HTMLSelectElement>['onBlur'];
  /**
   * Callback function called when the value changes.
   * @param value New value
   * @returns void.
   */
  onValueChanged: (value: string) => void;
};

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>((props, ref) => {
  const {
    id,
    label,
    error,
    errorMessage,
    help,
    helpMessage,
    name,
    placeholder,
    children,
    onBlur,
    onValueChanged,
    reseteable = false,
    value,
  } = props;

  const getConvertedValue = (value: string | number) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    return '';
  };

  const [inputValue, setInputValue] = useState<string>(getConvertedValue(value as string | number));

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleInputReset = () => {
    setInputValue(getConvertedValue('' as string | number));
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
      <select
        ref={ref}
        name={name}
        value={inputValue}
        placeholder={placeholder}
        className={clsx(
          'shadow-sm bg-neutral-50 border-2 border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light',
          error ? 'border-2 !border-red-600 dark:!border-red-400' : ''
        )}
        aria-invalid={error ? 'true' : 'false'}
        onChange={handleInputChange}
        onBlur={onBlur}
      >
        {children}
      </select>
    </InputWrapper>
  );
});

SelectInput.displayName = 'SelectInput';
