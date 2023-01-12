import React from 'react';
import { Meta } from "@storybook/react";
import FollowButton, { FollowButtonProps } from './FollowButton';

export default {
  component: FollowButton,
} as Meta<typeof FollowButton>;

export const Default = {
  render: (args) => <FollowButton {...args}/>,
  args: {
    isFollowing: false,
    onToggle: () => {},
  } as FollowButtonProps
}
