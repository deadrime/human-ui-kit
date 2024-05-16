import classNames from 'classnames';
import React, { forwardRef, HTMLProps } from 'react';
import { CSSProperties } from 'react';
import styles from './Truncate.module.less';

export type TruncateProps = {
  children: React.ReactNode;
  linesCount?: number;
  isTruncated?: boolean;
  showMoreButton?: boolean;
} & Pick<HTMLProps<HTMLDivElement>, 'className' | 'style' | 'onClick'>

const Truncate = forwardRef<HTMLDivElement, TruncateProps>(({
  children,
  linesCount = 2,
  isTruncated = true,
  className,
  style,
  ...props
}, ref) => {
  return (
    <>
      <div
        className={classNames(styles.truncate, {
          [styles.isTruncated]: isTruncated,
        }, className)}
        style={{ '--linesCount': linesCount, ...style } as CSSProperties}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </>
  );
});

export default Truncate;
