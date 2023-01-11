import classNames from 'classnames';
import React, { memo, CSSProperties } from 'react';
import styles from './Progress.module.less';

type ProgressProps = {
  backgroundColor?: string
  strokeColor?: string
  percent: number
  style?: CSSProperties
  className?: string
}

const Progress: React.FC<ProgressProps> = ({
  percent,
  backgroundColor = 'var(--color-gray-500)',
  strokeColor = 'var(--color-primary)',
  style,
  className,
}) => {
  return (
    <div
      className={classNames(styles.wrapper, className)}
      style={{
        '--progressBackgroundColor': backgroundColor,
        '--progressStrokeColor': strokeColor,
        ...style,
      } as CSSProperties}
    >
      <div
        style={{
          width: `${percent}%`,
        }}
        className={styles.percentBar}
      />
    </div>
  );
};

export default memo(Progress);
