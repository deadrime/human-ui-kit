import React, { forwardRef, HTMLProps } from 'react';
import classNames from 'classnames';
import Text, { TextProps } from '@components/Text';
import Spinner from '../Spinner/Spinner';
import './Button.less';
import { useIsMobile } from '@hooks/useIsMobile';

export type ButtonSize = 'xSmall' | 'small' | 'medium' | 'large';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  md?: ButtonSize,
  style?: React.CSSProperties;
  htmlType?: 'button' | 'submit';
  id?: string;
  filled?: boolean;
  fullWidth?: boolean;
  outlined?: boolean;
  transparent?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: HTMLProps<HTMLButtonElement>['onFocus'];
  onBlur?: HTMLProps<HTMLButtonElement>['onBlur'];
  onMouseLeave?: HTMLProps<HTMLButtonElement>['onMouseLeave'];
  onMouseEnter?: HTMLProps<HTMLButtonElement>['onMouseEnter'];
  textProps?: Omit<TextProps, 'ref'>;
  pureChildren?: boolean;
  tabIndex?: number;
}

// TODO: sm, md, lg configuration in case we need more break points.
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'medium',
  icon,
  outlined = false,
  transparent = false,
  disabled = false,
  loading = false,
  filled = false,
  fullWidth = false,
  htmlType = 'button',
  className,
  children,
  style,
  onClick,
  textProps = {},
  pureChildren,
  md,
  ...props
}, ref) => {
  const isMobile = useIsMobile();
  const defaultTextProps: Pick<TextProps, 'size' | 'family' | 'bold'> = {
    size: size === 'small' ? 'body2' : 'body1',
    family: 'cerebri',
    bold: true,
  };

  if (md && !isMobile) {
    defaultTextProps.size = 'body1';
  }

  return (
    <button
      {...props}
      type={htmlType}
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...style,
      } as React.CSSProperties}
      className={classNames('btn', className, {
        'btn--outlined': outlined,
        'btn--filled': filled,
        'btn--transparent': transparent,
        'btn--disabled': disabled,
        'btn--loading': loading,
        'btn--fullWidth': fullWidth,
        'btn--icon': !!icon,
        [`btn--${variant}`]: variant,
        [`btn--${size}`]: size,
        [`btn--md:size-${md}`]: md,
      })}
    >
      {loading && <Spinner size={size} />}
      {!loading && icon}
      {typeof children !== 'undefined' && !pureChildren ? <Text
        {...defaultTextProps}
        {...textProps}
      >
        {children}
      </Text> : children}
    </button>
  );
});

export default Button;
