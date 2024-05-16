import { ClipboardEventHandler, CSSProperties, FC, ForwardedRef, HTMLProps, KeyboardEventHandler, ReactElement, ReactNode } from 'react';
import { ValidationStatus } from '@components/Form/types';
import { FontSize } from '@components/Text';

interface CoreInputProps<T> {
  value?: T;
  onChange?: (value?: T) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  onPaste?: ClipboardEventHandler<HTMLElement>;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  autofocus?: boolean;
  ref?: ForwardedRef<HTMLInputElement>;
  id?: string;
  type?: HTMLProps<HTMLInputElement>['type'];
  validationStatus?: ValidationStatus;
  name?: HTMLProps<HTMLInputElement>['name'];
  autoComplete?: HTMLProps<HTMLInputElement>['autoComplete'];
}

export interface InputProps<T> extends CoreInputProps<T> {
  className?: string;
  focused?: boolean;
  invalid?: boolean;
}

export type Input<T = unknown, R extends InputProps<T> = InputProps<T>> = FC<R>;

type RenderHint<T> = (value: T) => React.ReactNode

export type CoreInputWrapperProps<
  T = unknown,
  R extends InputProps<T> = InputProps<T>,
> = {
  align?: 'left' | 'right',
  suffix?: ReactElement;
  prefix?: ReactNode;
  hint?: ReactElement | RenderHint<T>;
  forceRenderHint?: boolean;
  round?: boolean;
  bold?: boolean;
  fontSize?: FontSize;
  outlined?: boolean;
  className?: string;
  style?: CSSProperties;
  inputClassName?: string;
  containerClassName?: string;
  padded?: boolean;
  hasFeedback?: boolean;
  transformValue?: (value: T) => unknown;
} & CoreInputProps<T> & Omit<R, Extract<keyof R, keyof InputProps<T>>>;

export type InputWrapperProps<
  T = unknown,
  R extends InputProps<T> = InputProps<T>,
  C extends Input<T, R> = Input<T, R>
> = CoreInputWrapperProps<T, R> & {
  component: C;
};
