import classNames from 'classnames';
import React, { ChangeEvent, forwardRef } from 'react';
import { InputProps } from './types';

export type TimeValue = {
  hours: number;
  minutes: number;
}

export interface TimeInputProps extends Omit<InputProps<TimeValue>, 'onChange'> {
  native?: boolean;
  min?: TimeValue;
  max?: TimeValue;
  onChange?: (value: TimeValue|ChangeEvent<HTMLInputElement>) => void;
}

function timeValueToString(timeValueToStringify?: TimeValue) {
  if (timeValueToStringify == null) {
    return undefined;
  }

  const dateObject = new Date(2023, 0, 1, timeValueToStringify.hours, timeValueToStringify.minutes);
  return dateObject.toLocaleTimeString('en-GB', {
    timeStyle: 'short',
  });
}

function timeFromString(stringToParse: string): TimeValue {
  const timeMatch = stringToParse.match(/^(\d+)(?::(\d\d))?(\s[ap])?/);
  if (timeMatch == null || timeMatch.length === 0) {
    return null;
  }

  const [, hours, minutes, is12Hour] = timeMatch;
  return {
    hours: hours ? parseInt(hours) + (is12Hour ? 12 : 0) : 0,
    minutes: minutes ? parseInt(minutes) : 0,
  };
}

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(({
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
      value={timeValueToString(value)}
      placeholder={placeholder}
      onChange={(event) => {
        if (native) {
          onChange?.(event);
        } else {
          onChange?.(timeFromString(event.target?.value));
        }
      }}
      type="time"
      onFocus={onFocus}
      min={timeValueToString(min)}
      max={timeValueToString(max)}
      onBlur={onBlur}
      disabled={disabled}
      readOnly={readOnly}
      ref={ref}
      id={id}
      {...props}
    />
  );
});
