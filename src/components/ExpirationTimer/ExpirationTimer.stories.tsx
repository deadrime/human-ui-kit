import React from 'react';
import { Meta } from '@storybook/react';
import { ExpirationTimer, ExpirationTimerProps } from './ExpirationTimer';

export default {
  component: ExpirationTimer,
} as Meta<typeof ExpirationTimer>;

export const Default = {
  render: (args) => <ExpirationTimer tooltip="Some tooltip" {...args} />,
  args: {
    expirationInterval: 10,
  } as ExpirationTimerProps,
};
