import React from 'react';
import { Meta } from '@storybook/react';
import { DisplayProfile, DisplayProfileProps, defaultDisplayProfileRenderField, VerificationIcon } from './DisplayProfile';
import { BaseProfile } from './types';
import Tooltip from '@components/Tooltip';
import Text from '@components/Text';
export default {
  component: DisplayProfile,
} as Meta<typeof DisplayProfile>;

export const Default = {
  render: (args) => <DisplayProfile {...args} />,
  args: {
    profile: {
      username: 'jimcappelletti',
      fullName: 'Jim Cappelletti',
      isVerified: true,
      ticker: 'JIM',
      avatar: 'https://i.imgur.com/bHqoquL.jpeg',
    },
    titleLayout: ['fullName', 'isVerified'],
    subtitleLayout: ['username', 'ticker'],
  } as DisplayProfileProps<BaseProfile, typeof defaultDisplayProfileRenderField>,
};

export const Skeleton = {
  render: (args) => <DisplayProfile {...args} />,
  args: {
    profile: undefined,
    titleLayout: ['fullName', 'isVerified'],
    subtitleLayout: ['username', 'ticker'],
  } as DisplayProfileProps<BaseProfile, typeof defaultDisplayProfileRenderField>,
};


export const CustomDisplayProfile = {
  render: (args) => <DisplayProfile {...args} />,
  args: {
    profile: {
      username: 'jimcappelletti',
      fullName: 'Jim Cappelletti',
      isVerified: true,
      ticker: 'JIM',
      avatar: 'https://i.imgur.com/bHqoquL.jpeg',
    },
    titleLayout: ['fullName', (profile) => (
      <Tooltip overlay={'Verified'}>
        <div>
          <VerificationIcon isVerified={profile?.isVerified} />
        </div>
      </Tooltip>
    )],
    subtitleLayout: [() => <Text>Something</Text>],
    getAvatarUrl: profile => profile ? `/${profile.username}` : null,
  } as DisplayProfileProps<BaseProfile, typeof defaultDisplayProfileRenderField>,
};
