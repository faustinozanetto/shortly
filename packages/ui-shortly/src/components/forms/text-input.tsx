import clsx from 'clsx';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { InputWrapper, InputWrapperProps } from './input-wrapper';

type TextInputProps = Omit<InputWrapperProps, 'onInputReseted'> & {
  value: InputHTMLAttributes<HTMLInputElement>['value'];
  /** Name of the input */
  name: string;
  /** Optional: Input placeholder */
  placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder'];
  /** Optional: Input type */
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  /** Optional: Input mode */
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
  /** Optional: Input step */
  step?: InputHTMLAttributes<HTMLInputElement>['step'];
  /** Optional: Show an icon in the input field */
  icon?: React.ReactElement;
  /** Optional: Input onBlur handler */
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
  /**
   * Callback function called when the value changes.
   * @param value New value
   * @returns void.
   */
  onValueChanged: (value: string) => void;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    id,
    value,
    label,
    error = false,
    errorMessage,
    help = false,
    helpMessage,
    placeholder,
    name,
    icon,
    reseteable = false,
    step = '1',
    type = 'text',
    inputMode = 'text',
    onBlur,
    onValueChanged,
  } = props;

  const getConvertedValue = (value: string | number) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    return '';
  };

  const [inputValue, setInputValue] = useState<string>(getConvertedValue(value as string | number));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleInputReset = () => {
    setInputValue(getConvertedValue('' as string | number));
  };

  useEffect(() => {
    onValueChanged(getConvertedValue(inputValue));
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
      {icon ? (<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        {icon}
      </div>) : null}
      <input
        ref={ref}
        name={name}
        value={inputValue}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        step={step}
        className={clsx(
          'shadow-sm bg-neutral-50 border-2 border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light',
          error ? 'border-2 !border-red-600 dark:!border-red-400' : '',
          icon ? 'pl-10' : '',
        )}
        aria-invalid={error ? 'true' : 'false'}
        onChange={handleInputChange}
        onBlur={onBlur}
      />
    </InputWrapper>
  );
});

TextInput.displayName = 'TextInput';
