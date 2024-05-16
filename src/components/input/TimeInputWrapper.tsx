import React, { forwardRef } from 'react';
import { TimeInput, TimeInputProps, TimeValue } from './TimeInput';
import { InputWrapper } from './InputWrapper';
import { CoreInputWrapperProps } from './types';

export const TimeInputWrapper = forwardRef<HTMLInputElement, CoreInputWrapperProps<TimeValue, TimeInputProps>>(
  (props, ref) => {
    return <InputWrapper component={TimeInput} ref={ref} {...props} />;
  }
);
