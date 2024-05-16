import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { ChangeEvent, forwardRef } from 'react';
import { InputProps } from './types';

export interface DateInputProps extends Omit<InputProps<Date>, 'onChange'> {
  native?: boolean;
  min?: Date;
  max?: Date;
  onChange?: (value: Date|ChangeEvent<HTMLInputElement>) => void;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(({
  onChange,
  value,
  disabled,
  readOnly,
  onFocus,
  placeholder,
  className,
  onBlur,
  id,
  focused,
  native,
  min,
  max,
  ...props
}, ref: any) => {
  return (
    <input
      className={classNames('input', { focused }, className)}
      value={dayjs(value).format('YYYY-MM-DD')}
      placeholder={placeholder}
      onChange={(event) => {
        if (native) {
          onChange?.(event);
        } else {
          onChange?.(dayjs(event.target?.value).toDate());
        }
      }}
      type="date"
      onFocus={onFocus}
      min={min ? dayjs(min).format('YYYY-MM-DD') : undefined}
      max={max ? dayjs(max).format('YYYY-MM-DD') : undefined}
      onBlur={onBlur}
      disabled={disabled}
      readOnly={readOnly}
      ref={ref}
      id={id}
      {...props}
    />
  );
});
