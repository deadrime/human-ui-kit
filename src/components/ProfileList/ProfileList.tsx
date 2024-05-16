import React, { CSSProperties, useMemo } from 'react';
import styles from './ProfileList.module.less';
import classNames from 'classnames';
import times from 'lodash/times';
import IconMore from '@icons/more.svg';
import { Skeleton } from '@components/Skeleton';
import Avatar from '@components/Avatar';
import InternalLink from '@components/InternalLink/InternalLink';
import { LOADING_STATUSES } from '@const/loading-statuses';

type ProfileListItemProps = {
  children: React.ReactNode
  index: number
  onClick?: () => void
  className?: string
}

export const ProfileListItem: React.FC<ProfileListItemProps> = ({ children, index, onClick, className }) => (
  <div
    className={classNames(styles.profileListItem, className)}
    style={{ '--index': index } as CSSProperties}
    onClick={(e) => {
      e.preventDefault();
      onClick?.();
    }}
  >
    {children}
  </div>
);

export const ProfileListItemSkeleton = ({ index }) => (
  <ProfileListItem index={index}>
    <Skeleton
      circle
      className={styles.profileListItemSkeleton}
      key={index}
    />
  </ProfileListItem>
);

export const ProfileListOthers = ({ index, count }) => (
  <ProfileListItem className={styles.otherItems} index={index}>
    +{count}
  </ProfileListItem>
);

export type ProfileListProps<T extends unknown> = {
  loadingStatus: keyof typeof LOADING_STATUSES
  maxCount?: number
  items: T[]
  renderAvatar?: (item: T, index: number) => React.ReactElement,
  onOpen?: () => void
  size?: 'small' | 'normal'
  zeroResults?: string | React.ReactNode
  isLeftAligned?: boolean,
  triggerOpenOnAvatarClick?: boolean,
  borderColor?: string,
  otherItemsBackground?: string,
  otherIconColor?: string,
  style?: CSSProperties;
  className?: string;
}

export type ProfileListAvatarProps = {
  src?: string
  url?: string
  index?: number
  onClick?: () => void
}

export const ProfileListAvatar: React.FC<ProfileListAvatarProps> = ({ src, url, index, onClick }) => {
  if (!src) {
    return <ProfileListItemSkeleton index={index} />;
  }

  return (
    <ProfileListItem index={index} onClick={onClick}>
      {onClick ? (
        <div onClick={onClick} style={{ display: 'flex', width: '100%', height: '100%', cursor: 'pointer' }}>
          <Avatar
            src={src}
            size={{
              mobile: '100%',
              desktop: '100%',
            }}
          />
        </div>
      ) : (
        <InternalLink href={url} style={{ display: 'flex', width: '100%', height: '100%' }}>
          <Avatar
            src={src}
            size={{
              mobile: '100%',
              desktop: '100%',
            }}
          />
        </InternalLink>
      )}
    </ProfileListItem>
  );
};

export const ProfileList = <T extends unknown>({
  loadingStatus,
  maxCount = 5,
  items = [],
  onOpen,
  triggerOpenOnAvatarClick,
  renderAvatar,
  size = 'small',
  borderColor = 'var(--profileList-borderColor)',
  otherItemsBackground = 'var(--profileList-otherItemsBackground)',
  otherIconColor = 'var(--profileList-otherIconColor, var(--color-gray-200))',
  zeroResults,
  isLeftAligned = true,
  className,
  style,
}: ProfileListProps<T>) => {
  const topProfiles = items.slice(0, maxCount);

  const results = useMemo(() => (
    <>
      {topProfiles.map((item, index) => (
        React.cloneElement(renderAvatar?.(item, index), {
          index,
          key: index,
          onClick: triggerOpenOnAvatarClick ? onOpen : undefined,
        })
      ))}
      {topProfiles.length > 0 && (
        <ProfileListItem
          onClick={onOpen}
          className={styles.otherItems}
          index={Math.min(maxCount, topProfiles.length)}
        >
          <IconMore width={20} color={otherIconColor} />
        </ProfileListItem>
      )}
    </>
  ), [topProfiles, onOpen, maxCount, otherIconColor, renderAvatar, triggerOpenOnAvatarClick]);

  return (
    <div
      className={classNames(styles.profileList, {
        [styles.profileListSmall]: size === 'small',
        [styles.rightAligned]: !isLeftAligned,
      }, className)}
      style={{
        '--borderColor': borderColor,
        '--otherItemsBackground': otherItemsBackground,
        ...style,
      } as CSSProperties}
    >
      {loadingStatus === LOADING_STATUSES.SUCCESS &&
      topProfiles.length === 0 && (
        <div className={styles.zeroResults}>{zeroResults}</div>
      )}
      {loadingStatus !== LOADING_STATUSES.SUCCESS
      ? times(maxCount + 1).map(
          (index) => <ProfileListItemSkeleton key={index} index={index} />
        )
      : results}
    </div>
  );
};
