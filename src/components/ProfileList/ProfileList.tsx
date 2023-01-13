import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
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
    onClick={onClick}
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
  renderAvatar?: (item: T, index: number) => React.ReactNode,
  onOpen?: () => void
  size?: 'small' | 'normal'
  zeroResults?: string | React.ReactNode
  isLeftAligned?: boolean,
  borderColor?: string,
  otherItemsBackground?: string,
  style?: CSSProperties;
  className?: string;
}

export type ProfileListAvatarProps = {
  src?: string
  url?: string
  index: number
}

export const ProfileListAvatar: React.FC<ProfileListAvatarProps> = ({ src, url, index }) => {
  if (!src) {
    return <ProfileListItemSkeleton index={index} />;
  }

  return (
    <ProfileListItem index={index}>
      <InternalLink href={url} style={{ display: 'flex', width: '100%', height: '100%' }}>
        <Avatar
          src={src}
          size={{
            mobile: '100%',
            desktop: '100%',
          }}
        />
      </InternalLink>
    </ProfileListItem>
  );
};

export const ProfileList = <T extends unknown>({
  loadingStatus,
  maxCount = 5,
  items = [],
  onOpen,
  renderAvatar,
  size = 'small',
  borderColor = 'gray-900',
  otherItemsBackground = 'gray-800',
  zeroResults,
  isLeftAligned = true,
  className,
  style,
}: ProfileListProps<T>) => {
  const topProfiles = items.slice(0, maxCount);

  const results = useMemo(() => (
    <>
      {topProfiles.map((item, index) => (
        renderAvatar?.(item, index)
      ))}
      {topProfiles.length > 0 && (
        <ProfileListItem
          onClick={onOpen}
          className={styles.otherItems}
          index={Math.min(maxCount, topProfiles.length)}
        >
          <IconMore width={20} color="var(--color-gray-200)" />
        </ProfileListItem>
      )}
    </>
  ), [renderAvatar, maxCount, onOpen, size, topProfiles]);

  return (
    <div
      className={classNames(styles.profileList, {
        [styles.profileListSmall]: size === 'small',
        [styles.rightAligned]: !isLeftAligned,
      }, className)}
      style={{
        '--borderColor': `var(--color-${borderColor})`,
        '--otherItemsBackground': `var(--color-${otherItemsBackground})`,
        ...style
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
