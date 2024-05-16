import React from 'react';
import { Meta } from '@storybook/react';
import { PollStats, PollStatsProps } from './PollStats';

export default {
  component: PollStats,
} as Meta<typeof PollStats>;

const options = [
  {
    id: '1',
    name: '#SELFIE',
    percentage: 60,
  },
  {
    id: '2',
    name: 'Closer',
    percentage: 14,
  },
  {
    id: '3',
    name: 'Paris',
    percentage: 26,
  },
];

export const Default = {
  render: (args) => <PollStats {...args} />,
  args: {
    options,
  } as PollStatsProps,
};

export const WithUserChoice = {
  render: (args) => <PollStats {...args} />,
  args: {
    options,
    userChoice: '2',
  } as PollStatsProps,
};

export const WithWinner = {
  render: (args) => <PollStats {...args} />,
  args: {
    options,
    userChoice: '2',
    winner: '1',
    textInside: false,
  } as PollStatsProps,
};

export const CustomProgressHeight = {
  render: (args) => <PollStats {...args} />,
  args: {
    options,
    userChoice: '2',
    winner: '1',
    textInside: false,
    progressHeight: 16,
  } as PollStatsProps,
};
