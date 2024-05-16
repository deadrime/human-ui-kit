import React from 'react';
import { Meta } from '@storybook/react';
import Skeleton from './Skeleton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Skeleton,
} as Meta<any>;

export const Default = {
  render: (args) => <div><Skeleton width={250} /><Skeleton circle width={80} height={80} /></div>,
};
