import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useHover } from 'react-use';
import { Button, ButtonProps } from '@components/buttons';
import styles from './FollowButton.module.less';
import { useModal } from '@components/Modal';

export interface FollowButtonProps extends ButtonProps {
  isFollowing: boolean
  onToggle: (isFollowing: boolean) => void
  followMessage?: string
  followText?: string
  unfollowText?: string
  followingText?: string
  unfollowMessage?: string
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  onToggle,
  followMessage = 'You\'re now following!',
  unfollowMessage = 'You\'re no longer following!',
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
  const { message } = useModal();
  const [text, setText] = useState(followText);

  const handleClick = useCallback(async (event) => {
    try {
      await onToggle(!isFollowing);
      if (!isFollowing) {
        message.success(followMessage);
      } else {
        message.success(unfollowMessage);
      }
    } catch (err) {
      message.error('Network error. Please try again later');
    } finally {
      event.target.blur();
    }
  }, [isFollowing, message]);

  const followButton = (
    <Button
      {...props}
      variant={variant}
      outlined={outlined}
      loading={loading}
      onClick={handleClick}
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
  }, [isHovered, isFollowing, loading]);


  return (
    <>{hoverableFollowButton}</>
  );
};

export default FollowButton;
