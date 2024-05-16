import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import Switch, { SwitchProps } from './Switch';

export default {
  component: Switch,
} as Meta<typeof Switch>;

export const Default = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Switch {...args} checked={checked} onChange={setChecked} />
    );
  },
  args: {
    title: 'Some title',
  } as SwitchProps,
};
