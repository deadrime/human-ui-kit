import classNames from 'classnames';
import React, { forwardRef } from 'react';
import Text from '@components/Text';
import { InputWrapper } from './InputWrapper';
import { TextAreaInput, TextAreaInputProps } from './TextAreaInput';
import { CoreInputWrapperProps } from './types';
import styles from './TextAreaInputWrapper.module.less';

export type TextAreaInputWrapperProps = CoreInputWrapperProps<string, TextAreaInputProps> & {
  maxCharacters?: number;
}

export const TextAreaInputWrapper = forwardRef<HTMLTextAreaElement, TextAreaInputWrapperProps>((props, ref) => {
  const { maxCharacters, value, hint, className } = props;
  return (
    <InputWrapper
      {...props}
      component={TextAreaInput as any}
      className={classNames(className, {
        [styles.extraBottomPadding]: !!maxCharacters,
      })}
      hint={<>
        {hint}
        {!!maxCharacters && <Text
          className={styles.characterCount}
          size="body2"
          color={value?.length > maxCharacters ? 'red' : 'gray-300'}
        >
          {value?.length || 0} / {maxCharacters}
        </Text>}
      </>}
      forceRenderHint
      ref={ref as any}
    />
  );
});

export default TextAreaInputWrapper;
