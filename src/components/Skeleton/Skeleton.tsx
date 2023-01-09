import classNames from 'classnames';
import React from 'react';
import { default as LibComponent, SkeletonTheme, SkeletonProps as LibProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './Skeleton.module.less';

export interface SkeletonProps extends LibProps {
  block?: boolean
}

const Skeleton: React.FC<SkeletonProps> = ({ block, ...props }) => {
  return (
    <SkeletonTheme baseColor="var(--skeletonColor)" highlightColor="var(--highlightColor)">
      <LibComponent
        {...props}
        containerClassName={classNames(
          styles.skeleton,
          props.className,
          {
            [styles.block]: !!block,
            [styles.circle]: !!props.circle,
          })}
      />
    </SkeletonTheme>
  );
};

export default Skeleton;
