import classNames from 'classnames';
import React, { memo, CSSProperties, useRef, useState, useEffect, useCallback } from 'react';
import styles from './Progress.module.less';

export type ProgressProps = {
  percent: number
  style?: CSSProperties
  height?: number
  className?: string
  textLeft?: string
  textRight?: string
  highlighted?: boolean;
}

const Progress: React.FC<ProgressProps> = ({
  percent,
  style,
  className,
  height = 8,
  textLeft,
  textRight,
  highlighted = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progressWidth, setProgressWidth] = useState(0);

  const calculateWidth = useCallback(() => {
    setProgressWidth(wrapperRef.current.clientWidth);
  }, [wrapperRef]);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    if (!textLeft || !textRight) {
      return;
    }
    calculateWidth();
  }, [textLeft, textRight, wrapperRef, calculateWidth]);

  useEffect(() => {
    if (!textLeft || !textRight) {
      return;
    }
    window.addEventListener('resize', calculateWidth);
    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  }, [calculateWidth, textLeft, textRight]);

  return (
    <div
      className={classNames(styles.wrapper, className, {
        [styles.highlighted]: highlighted,
      })}
      style={{
        ...style,
      } as CSSProperties}
      ref={wrapperRef}
    >
      <div
        style={{
          width: `${percent}%`,
          height,
          minHeight: (textLeft || textRight) ? 26 : undefined,
        }}
        className={styles.percentBar}
      >
        <div className={styles.textContainerInside} style={{ width: progressWidth }}>
          {textLeft && <span>{textLeft}</span>}
          {textRight && <span>{textRight}</span>}
        </div>
      </div>
      <div className={classNames(styles.textContainerOutside, styles.textContainerAbsolute)}>
        {textLeft && <span>{textLeft}</span>}
        {textRight && <span>{textRight}</span>}
      </div>
    </div>
  );
};

export default memo(Progress);
