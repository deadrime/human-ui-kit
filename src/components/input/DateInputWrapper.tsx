import React, { forwardRef } from 'react';
import { DateInput, DateInputProps } from './DateInput';
import { InputWrapper } from './InputWrapper';
import { CoreInputWrapperProps } from './types';

export const DateInputWrapper = forwardRef<HTMLInputElement, CoreInputWrapperProps<Date, DateInputProps>>(
  (props, ref) => {
    return <InputWrapper component={DateInput} ref={ref} {...props} />;
  }
);
