import classNames from 'classnames';
import React, { FC, forwardRef, useState } from 'react';
import styles from './InputWrapper.module.less';
import { InputWrapperProps } from './types';
import SuccessIcon from '@icons/approve.svg';
import LoadingIcon from '@icons/loading.svg';
import { ValidationStatus } from '@components/Form/types';

interface FeedbackIconProps {
  validationStatus: ValidationStatus;
}

const FeedbackIcon: FC<FeedbackIconProps> = ({ validationStatus }) => {
  switch (validationStatus) {
    case 'success':
      return (
        <SuccessIcon
          width={14}
          color="var(--input-feedbackSuccessColor, var(--color-primary))"
        />
      );
    case 'validating':
      return <LoadingIcon width={14} color="var(--input-feedbackSuccessColor, var(--color-primary))" />;
    default:
      return null;
  }
};

export const InputWrapper = forwardRef<HTMLInputElement, InputWrapperProps>(({
  component,
  suffix,
  prefix,
  hint,
  forceRenderHint,
  align = 'left',
  outlined,
  round,
  bold = false,
  fontSize = 'body1',
  disabled,
  className,
  containerClassName,
  padded = true,
  inputClassName,
  onChange,
  onBlur,
  onFocus,
  style,
  value,
  hasFeedback,
  validationStatus,
  transformValue = i => i,
  ...additionalProps
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [, setTouched] = useState(false);
  const [, setDirty] = useState(false);

  const invalid = validationStatus === 'error';
  const feedbackIcon = hasFeedback && <FeedbackIcon validationStatus={validationStatus} />;

  const input = React.createElement(component, {
    ref,
    className: inputClassName,
    onChange: (value) => {
      onChange?.(transformValue(value));
      setDirty(true);
    },
    disabled,
    focused,
    onFocus: () => {
      setFocused(true);
      setTouched(true);
      onFocus && onFocus();
    },
    onBlur: () => {
      setFocused(false);
      onBlur && onBlur();
    },
    value,
    ...additionalProps,
  });

  const inputHint = React.useMemo(() => hint && (!invalid || forceRenderHint) && (
    <div className={styles.inputHint}>
      {typeof hint === 'function' ? hint(value) : hint}
    </div>
  ), [hint, value, invalid, forceRenderHint]);

  return (
    <div className={classNames(styles.inputWrapperContainer, containerClassName)} style={style}>
      <div
        className={classNames(
          styles.inputWrapper,
          `input--align-${align}`,
          `text-${fontSize}`,
          {
            ['input--round']: round,
            ['input--outlined']: outlined,
            ['input--disabled']: disabled,
            ['input--invalid']: invalid,
            ['input--focused']: focused,
            ['input--bold']: bold,
            ['input--padded']: padded,
            ['input--empty']: value == null || value == '',
          },
          className
        )}
      >
        {prefix && <div className={styles.inputPrefix}>
          {prefix}
        </div>}
        {input}
        {(feedbackIcon || suffix) && <div className={styles.inputSuffix}>
          {feedbackIcon || suffix}
        </div>}
      </div>
      {inputHint}
    </div>
  );
});
