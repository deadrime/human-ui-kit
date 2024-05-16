import React from 'react';
import { Meta } from '@storybook/react';
import LinkButton, { LinkButtonProps } from './LinkButton';

export default {
  component: LinkButton,
} as Meta<typeof LinkButton>;

export const Default = {
  render: (args) => <LinkButton {...args} />,
  args: {
    variant: 'primary',
    children: 'some children',
  } as LinkButtonProps,
};
