import React from 'react';
import { Meta } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  component: Button,
} as Meta<typeof Button>;

export const Default = {
  render: (args) => <Button {...args}>Some text</Button>,
  args: {
    variant: 'primary',
    size: 'medium',
    filled: true,
    outlined: false,
  } as ButtonProps,
};
