import classNames from 'classnames';
import React, { HTMLProps } from 'react';
import styles from './Tags.module.less';

export type TagsProps = HTMLProps<HTMLDivElement> & {
  children: JSX.Element | JSX.Element[],
  className?: string
}

const Tags:React.FC<TagsProps> = ({ children, className, ...props }) => (
  <div className={classNames(styles.tags, className)} {...props}>
    {children}
  </div>
);

export default Tags;
