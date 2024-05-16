import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ProgressWithSteps from './ProgressWithSteps';
import { Text } from '../Text';

export default {
  component: ProgressWithSteps,
} as Meta<typeof ProgressWithSteps>;

export const Default: StoryObj<typeof ProgressWithSteps> = {
  render: (args) => {

    return (
      <ProgressWithSteps {...args} />
    );
  },
  args: {
    currentStep: 1,
    steps: [
      {
        title: 'Structure',
        subtitle: 'Personal Angel Fund',
      },
      {
        title: 'Regulatory framework',
        subtitle: <>
          <Text>Private Raise</Text> <Text color="gray-200">Reg D, 506 (b)</Text>
        </>,
      },
      {
        title: 'Thesis, terms, exclusions',
      },
      {
        title: 'Target and timeline',
      },
    ],
  },
};
