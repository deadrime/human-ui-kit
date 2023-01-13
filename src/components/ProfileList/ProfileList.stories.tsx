import React from 'react';
import { Meta } from "@storybook/react";
import { ProfileList, ProfileListAvatar, ProfileListProps } from './ProfileList';
import { LOADING_STATUSES } from '@const/loading-statuses';

export default {
  component: ProfileList,
} as Meta<typeof ProfileList>;

export const Default = {
  render: (args) => <ProfileList {...args}/>,
  args: {
    items: [
      'https://damion.club/uploads/posts/2022-01/1643127246_31-damion-club-p-kot-na-avu-32.jpg',
      'https://damion.club/uploads/posts/2022-01/1643127246_31-damion-club-p-kot-na-avu-32.jpg',
      'https://damion.club/uploads/posts/2022-01/1643127246_31-damion-club-p-kot-na-avu-32.jpg',
      'https://damion.club/uploads/posts/2022-01/1643127246_31-damion-club-p-kot-na-avu-32.jpg',
      'https://damion.club/uploads/posts/2022-01/1643127246_31-damion-club-p-kot-na-avu-32.jpg'
    ],
    loadingStatus: LOADING_STATUSES.SUCCESS,
    maxCount: 10,
    renderAvatar: (item, index) => <ProfileListAvatar index={index} src={String(item)} url={'/'} />,
  } as ProfileListProps<String>,
};
