import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import FollowButton, { FollowButtonProps } from './FollowButton';

export default {
  component: FollowButton,
} as Meta<typeof FollowButton>;

export const Default = {
  render: (args) => {
    const [isFollowing, setIsFollowing] = useState(false);

    return (
      <FollowButton {...args} isFollowing={isFollowing} onToggle={setIsFollowing} />
    );
  },
  args: {
    isFollowing: false,
  } as FollowButtonProps,
};
