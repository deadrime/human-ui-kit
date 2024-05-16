import React from 'react';
import { Meta } from '@storybook/react';
import IconButton, { IconButtonProps } from './IconButton';
import IconBell from '@icons/bell.svg';

export default {
  component: IconButton,
} as Meta<typeof IconButton>;

export const Default = {
  render: (args) => <IconButton {...args} />,
  args: {
    icon: <IconBell />,
    variant: 'secondary',
    outlined: true,
  } as IconButtonProps,
};

export const WithCount = {
  render: (args) => <div><IconButton {...args} /></div>,
  args: {
    icon: <IconBell />,
    variant: 'secondary',
    outlined: true,
    count: 34,
  } as IconButtonProps,
  argTypes: {
    icon: {
      disable: true,
    },
  },
};
