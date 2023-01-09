import classNames from 'classnames';
import React, { CSSProperties, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Text from '@components/typography'
import styles from './Badge.module.less';

const MAX_COUNT = 99;

export type BadgeProps = {
  count: number;
  size?: number;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ count, size, className }) => {
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!count) return;

    setTransitioning(true);
  }, [count]);

  return (
    count > 0 &&
      <CSSTransition
        in={transitioning}
        className={classNames('counter', className, styles.badge)}
        timeout={300}
        onEntered={() => {
          setTransitioning(false);
        }}
      >
        <Text
          normal
          size={'body2'}
          style={size && { '--counterSize': `${size}px` } as CSSProperties}
        >
          {count <= MAX_COUNT ? count : `${MAX_COUNT}+`}
        </Text>
      </CSSTransition>
  );
};

export default Badge;

export type BadgeWrapperProps = BadgeProps & { children: React.ReactNode }

export const BadgeWrapper: React.FC<BadgeWrapperProps> = ({ children, ...props }) => {
  return <span className={styles.badgeWrapper}>{children} <Badge {...props} className={styles.badgeAbsolute} /></span>;
};
