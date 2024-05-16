import classNames from 'classnames';
import React, { CSSProperties, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Text, { TextProps } from '@components/Text';
import styles from './Badge.module.less';

const MAX_COUNT = 99;

export type BadgeProps = {
  count?: number;
  className?: string;
  size?: 'small' | 'normal';
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
  style?: CSSProperties;
  textProps?: TextProps;
}

const Badge: React.FC<BadgeProps> = ({
  count,
  size = 'small',
  variant = 'primary',
  className,
  style,
  textProps,
  children,
}) => {
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!count) return;

    setTransitioning(true);
  }, [count]);

  return (
    (count > 0 || children) &&
      <CSSTransition
        in={transitioning}
        className={classNames('counter', className, styles.badge, styles[size], styles[variant], {
          [styles.count]: typeof count !== 'undefined',
        })}
        timeout={300}
        style={style}
        onEntered={() => {
          setTransitioning(false);
        }}
      >
        <Text
          normal
          size={size === 'small' ? 'body2' : 'body1'}
          bold={size === 'normal'}
          {...textProps}
        >
          {children}
          {typeof count !== 'undefined' && (count <= MAX_COUNT ? count : `${MAX_COUNT}+`)}
        </Text>
      </CSSTransition>
  );
};

export default Badge;

export type BadgeWrapperProps = BadgeProps & { children: React.ReactNode }

export const BadgeWrapper: React.FC<BadgeWrapperProps> = ({ children, className, ...props }) => {
  return <span className={classNames(styles.badgeWrapper, className)}>{children} <Badge {...props} className={styles.badgeAbsolute} /></span>;
};
