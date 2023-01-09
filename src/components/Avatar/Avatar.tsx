import classNames from 'classnames';
import React, { CSSProperties, HTMLProps } from 'react';
import { AVATAR_SIZES, AvatarSize } from './constants';
import styles from './Avatar.module.less';
import Skeleton from '@components/Skeleton';

export type AvatarProps = Pick<React.HTMLProps<HTMLImageElement>, 'src' | 'alt' | 'tabIndex'> & {
  size?: keyof typeof AVATAR_SIZES | AvatarSize
  className?: string
  style?: CSSProperties
  nftEffect?: boolean
} & Pick<HTMLProps<HTMLDivElement>, 'onClick'>

const Avatar: React.FC<AvatarProps> = ({
  src,
  size = AVATAR_SIZES.medium,
  className,
  alt,
  style: userStyle,
  nftEffect,
  ...props
}) => {
  const style = {
    ...userStyle,
    ...typeof size === 'object' && {
      '--mobileSize': `${size.mobile}px`,
      '--desktopSize': `${size.desktop}px`,
    } as React.CSSProperties,
  };

  return (
    src ? <div
      className={classNames(
        styles.avatarWrapper,
        typeof size === 'string' && styles[size],
        className,
        {
          [styles.nftEffect]: nftEffect,
        }
      )}
      style={style}
      {...props}
    >
      <img
        src={src}
        className={classNames(styles.avatar)}
        alt={alt}
      />
    </div> : <Skeleton className={classNames(styles.avatarWrapper, typeof size === 'string' && styles[size], className)} style={style} circle />
  );
};

export default Avatar;
