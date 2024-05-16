import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import classes from './Ticker.module.less';

export type TickerProps = {
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
  showCircle?: boolean
}

export const Ticker: React.FC<TickerProps> = ({
  className,
  children,
  showCircle = true,
  ...props
}) => {
  if (!children) {
    return null;
  }

  return (
    <span
      className={classNames(classes.coin, className, {
        [classes.noCircle]: !showCircle,
      })}
      {...props}
    >
      {showCircle ? <>&nbsp;</> : null}{children}
    </span>
  );
};

export default Ticker;
