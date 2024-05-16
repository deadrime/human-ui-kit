import React from 'react';
import { Meta } from '@storybook/react';
import Tag from './Tag';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Tag,
} as Meta<typeof Tag>;

export const Default = {
  render: (args) => <Tag {...args} />,
  args: {
    children: 'Some badge',
    closable: true,
  },
};
