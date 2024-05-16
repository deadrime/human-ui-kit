import React from 'react';
import { Meta } from '@storybook/react';
import Avatar, { AvatarProps, AVATAR_SIZES } from '.';

export default {
  component: Avatar,
} as Meta<typeof Avatar>;

export const Default = {
  render: (args) => <Avatar {...args} />,
  args: {
    src: 'https://i.imgur.com/bHqoquL.jpeg',
    size: AVATAR_SIZES.xLarge,
    nftEffect: true,
  } as AvatarProps,
  argTypes: {
    size: {
      control: 'radio', options: Object.values(AVATAR_SIZES)
    }
  }
};
