import React from 'react';
import { Meta } from "@storybook/react";
import IconButton, { IconButtonProps } from './IconButton';
import IconEye from '@icons/eye.svg';

export default {
  component: IconButton,
} as Meta<typeof IconButton>;

export const Default = {
  render: (args) => <IconButton {...args}/>,
  args: {
    icon: <IconEye />,
    variant: 'secondary',
    outlined: true
  } as IconButtonProps
}
