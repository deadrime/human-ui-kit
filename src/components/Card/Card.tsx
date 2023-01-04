import classNames from 'classnames';
import React, { forwardRef, HTMLProps } from 'react';
import styles from './Card.module.less';

export interface CardProps extends HTMLProps<HTMLDivElement> {
  children: string | React.ReactElement | React.ReactElement[]
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
