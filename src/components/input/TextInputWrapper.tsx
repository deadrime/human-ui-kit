import React, { FC, forwardRef } from 'react';
import { InputWrapper } from './InputWrapper';
import { PasswordInput, TextInput, TextInputProps } from './TextInput';
import { CoreInputWrapperProps } from './types';

export const TextInputWrapper = forwardRef<HTMLInputElement, CoreInputWrapperProps<string, TextInputProps>>(
  (props, ref) => {
    return <InputWrapper component={TextInput} ref={ref} {...props} />;
  }
);

export const PasswordInputWrapper: FC<CoreInputWrapperProps<string, TextInputProps>> = (props) => {
  return <InputWrapper component={PasswordInput} {...props} />;
};
