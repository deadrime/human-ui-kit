import classNames from 'classnames';
import React, { FC, ReactNode, useMemo } from 'react';
import Spinner from '@components/Spinner';
import Text, { TextProps } from '@components/Text';
import { ButtonVariant } from './Button';
import styles from './LinkButton.module.less';

export type LinkButtonSize = 'small'|'large';

export interface LinkButtonProps {
  loading?: boolean;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: LinkButtonSize;
  className?: string;
  icon?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  htmlType?: 'button' | 'submit';
  textProps?: Omit<TextProps, 'ref'>;
  tabIndex?: number;
  id?: string;
  disabled?: boolean;
}

const LinkButton: FC<LinkButtonProps> = ({
  children,
  loading,
  size,
  className,
  variant,
  icon,
  disabled,
  htmlType,
  id,
  onClick,
  tabIndex,
  textProps,
}) => {
  const defaultTextProps: Pick<TextProps, 'size' | 'family'> = useMemo(() => ({
    size: size === 'small' ? 'body2' : 'body1',
    family: 'cerebri',
  }), [size]);

  return (
    <button
      id={id}
      onClick={onClick}
      tabIndex={tabIndex}
      disabled={disabled}
      type={htmlType}
      className={classNames(
        styles.linkButton,
        styles[`linkButton--${size}`],
        styles[`linkButton--${variant}`],
        className
      )}
    >
      {loading ? <Spinner size={size} /> : icon}
      {(typeof children === 'string') ? <Text
        {...defaultTextProps}
        {...textProps}
      >
        {children}
      </Text> : children}
    </button>
  );
};

export default LinkButton;
