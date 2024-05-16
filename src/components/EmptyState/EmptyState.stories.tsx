import React from 'react';
import { Meta } from '@storybook/react';
import EmptyState, { EmptyStateProps } from './EmptyState';

export default {
  component: EmptyState,
} as Meta<EmptyStateProps>;

export const Default = {
  render: (args) => <EmptyState {...args} />,
  args: {
    title: 'No activity yet',
    subtitle: 'Follow @lau to get notified',
    size: 'normal',
  } as EmptyStateProps,
};
