import React from 'react';
import { Meta } from '@storybook/react';
import Spinner from './Spinner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Spinner,
} as Meta<any>;

export const Default = {
  render: (args) => <Spinner {...args} />,
};
