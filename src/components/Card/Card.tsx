import classNames from 'classnames';
import React, { CSSProperties, forwardRef } from 'react';
import styles from './Card.module.less';

export type CardProps = {
  children: string | React.ReactElement | React.ReactElement[]
  style?: CSSProperties;
  className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={classNames(styles.card, className)}
    >
      {children}
    </div>
  );
});

export default Card;
