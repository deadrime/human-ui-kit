import React from 'react';
import styles from './Spinner.module.less';
import SpinnerIcon from 'components/icons/spinner.svg';
import classNames from 'classnames';

interface SpinnerProps {
  size: 'xSmall' | 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  style,
  className,
}) => {
  return (
    <div
      style={{
        ...style,
      } as React.CSSProperties}
      className={classNames(styles.spinner, className, typeof size === 'string' && styles[size])}
    >
      <SpinnerIcon width="100%" height="100%" />
    </div>
  );
};

export default Spinner;
