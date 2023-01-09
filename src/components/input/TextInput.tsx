import classNames from 'classnames';
import React, { ChangeEvent, forwardRef } from 'react';
import { Input, InputProps } from './types';

export interface TextInputProps extends Omit<InputProps<string>, 'onChange'> {
  autoComplete?: string;
  native?: boolean;
  onChange?: (value: string|ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  onChange,
  value,
  disabled,
  readOnly,
  onFocus,
  placeholder,
  autoComplete,
  className,
  onBlur,
  id,
  focused,
  native,
  ...props
}, ref: any) => {
  return (
    <input
      className={classNames('input', { focused }, className)}
      value={value}
      placeholder={placeholder}
      onChange={(event) => {
        if (native) {
          onChange?.(event);
        } else {
          onChange?.(event.target?.value);
        }
      }}
      autoComplete={autoComplete}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      readOnly={readOnly}
      ref={ref}
      id={id}
      {...props}
    />
  );
});

export const PasswordInput: Input<string, TextInputProps> = ({
  onChange,
  value,
  disabled,
  className,
  readOnly,
  placeholder,
  autoComplete,
  onFocus,
  onBlur,
  id,
  focused,
  ...props
}) => {
  return (
    <input
      type="password"
      className={classNames('input', {
        focused,
      }, className)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      value={value}
      onChange={(event) => {
        onChange && onChange(event.target.value);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      readOnly={readOnly}
      id={id}
      {...props}
    />
  );
};

export default TextInput;
