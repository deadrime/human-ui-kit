import React, { CSSProperties } from 'react';
import styles from './EmptyState.module.less';
import { Text } from '@components/Text';
import classNames from 'classnames';

export type EmptyStateProps = {
  size?: 'small' | 'normal'
  emoji?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Status: React.FC<EmptyStateProps> = ({
  size = 'small',
  emoji,
  title,
  subtitle,
  className,
  ...props
}) => (
  <div className={classNames(styles.wrapper, className, styles[size])} {...props}>
    {emoji && <Text size={size === 'small' ? 'title3' : 'title2'} className={styles.emoji} style={{ marginBottom: 4 }}>
      {emoji}
    </Text>}
    <Text
      size={size === 'small' ? 'body2' : 'body1'}
      bold
      style={{ marginBottom: 2 }}
      className={styles.title}
    >
      {title}
    </Text>
    {subtitle && <Text size={size === 'small' ? 'body2' : 'body1'} className={styles.subtitle}>
      {subtitle}
    </Text>}
  </div>
);

export default Status;
