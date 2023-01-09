import React from 'react';
import { Meta } from "@storybook/react";
import Switch, { SwitchProps } from "./Switch";

export default {
  component: Switch,
} as Meta<typeof Switch>;

export const Default = {
  render: (args) => <Switch {...args} title="Some title"/>,
  args: {
    checked: true
  } as SwitchProps
};
