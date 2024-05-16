import classNames from 'classnames';
import React, { CSSProperties, forwardRef } from 'react';
import styles from './Card.module.less';

export type CardProps = {
  children: string | React.ReactElement | React.ReactElement[]
  style?: CSSProperties;
  className?: string;
  tabIndex?: number;
  highlightOnHover?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className, highlightOnHover, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={classNames(styles.card, {
        [styles.highlightOnHover]: highlightOnHover,
      }, className)}
    >
      {children}
    </div>
  );
});

export default Card;
