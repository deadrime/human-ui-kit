import React from 'react';
import { Meta } from "@storybook/react";
import Avatar, { AvatarProps, AVATAR_SIZES } from ".";

export default {
  component: Avatar,
} as Meta<typeof Avatar>;

export const Default = {
  render: (args) => <Avatar {...args}/>,
  args: {
    src: 'https://damion.club/uploads/posts/2022-01/1643127246_31-damion-club-p-kot-na-avu-32.jpg',
    size: AVATAR_SIZES.xLarge,
    nftEffect: true
  } as AvatarProps
};
