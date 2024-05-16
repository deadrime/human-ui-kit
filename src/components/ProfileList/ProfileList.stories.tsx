import React from 'react';
import { Meta } from '@storybook/react';
import { ProfileList, ProfileListAvatar, ProfileListProps } from './ProfileList';
import { LOADING_STATUSES } from '@const/loading-statuses';

export default {
  component: ProfileList,
} as Meta<typeof ProfileList>;

export const Default = {
  render: (args) => <ProfileList {...args} />,
  args: {
    items: [
      'https://i.imgur.com/7zGF5we.jpeg',
      'https://i.imgur.com/7zGF5we.jpeg',
      'https://i.imgur.com/7zGF5we.jpeg',
      'https://i.imgur.com/7zGF5we.jpeg',
      'https://i.imgur.com/7zGF5we.jpeg',
    ],
    loadingStatus: LOADING_STATUSES.SUCCESS,
    maxCount: 10,
    onOpen: () => alert('open'),
    triggerOpenOnAvatarClick: true,
    renderAvatar: (item) => <ProfileListAvatar src={item} url={'/'} />,
  } as ProfileListProps<string>,
};
