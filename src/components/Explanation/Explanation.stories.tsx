import React from 'react';
import { Meta } from '@storybook/react';
import Explanation, { ExplanationProps } from './Explanation';

export default {
  component: Explanation,
} as Meta<typeof Explanation>;

export const Default = {
  render: (args) => <Explanation {...args}>Some text</Explanation>,
  args: {
    type: 'info',
  } as ExplanationProps,
  argTypes: {
    type: {
      options: ['info', 'warning'],
      control: { type: 'radio' },
    },
  },
};
