import classNames from 'classnames';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useHover } from 'react-use';
import { Button, ButtonProps } from '@components/buttons';
import styles from './FollowButton.module.less';

export interface FollowButtonProps extends ButtonProps {
  isFollowing: boolean;
  onToggle: (e: MouseEvent<HTMLButtonElement>) => Promise<unknown>;
  followMessage?: string;
  followText?: string;
  unfollowText?: string;
  followingText?: string;
  unfollowMessage?: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  onToggle,
  followText = 'Follow',
  unfollowText = 'Unfollow',
  followingText = 'Following',
  loading,
  className,
  size = 'small',
  variant = 'secondary',
  outlined = true,
  ...props
}) => {
  const [text, setText] = useState(followText);

  const followButton = (
    <Button
      {...props}
      variant={variant}
      outlined={outlined}
      loading={loading}
      onClick={onToggle}
      size={size}
      className={classNames(className, styles.followButton, {
        [styles.isFollowing]: isFollowing,
      })}
    >
      {text}
    </Button>
  );

  const [hoverableFollowButton, isHovered] = useHover(followButton);

  useEffect(() => {
    if (isFollowing) {
      let newText = followingText;

      if (isHovered || loading) {
        newText = unfollowText;
      }

      setText(newText);

    } else {
      setText(followText);
    }
  }, [isHovered, isFollowing, loading, followingText, unfollowText, followText]);


  return (
    <>{hoverableFollowButton}</>
  );
};

export default FollowButton;
