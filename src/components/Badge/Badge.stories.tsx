import React from 'react';
import { Meta } from '@storybook/react';
import Badge, { BadgeWrapper, BadgeProps } from './Badge';

export default {
  component: Badge,
} as Meta<typeof Badge>;

export const Default = {
  render: (args) => <div style={{ display: 'flex' }}><Badge {...args} /></div>,
  args: {
    children: 'some badge',
    variant: 'primary',
    size: 'normal',
  } as BadgeProps,
};

export const WithCount = {
  render: (args) => <div style={{ display: 'flex' }}><Badge {...args} /></div>,
  args: {
    count: 24,
    variant: 'primary',
    size: 'normal',
  } as BadgeProps,
};

export const AsWrapper = {
  render: (args) => (
    <div style={{ display: 'flex' }}>
      <BadgeWrapper {...args}>
        Some text
      </BadgeWrapper>
    </div>
  ),
  args: {
    count: 10,
    variant: 'primary',
    size: 'small',
  },
};
