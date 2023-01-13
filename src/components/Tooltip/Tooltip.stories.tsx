import React from 'react';
import { Meta } from "@storybook/react";
import { Tooltip, TooltipProps } from './';

export default {
  component: Tooltip,
} as Meta<typeof Tooltip>;

export const Default = {
  render: (args) => <Tooltip overlay="Some tooltip" {...args}>
    <div tabIndex={0} style={{ width: 60, marginTop: 100, marginLeft: 150, background: 'yellow', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>Trigger</div>
  </Tooltip>,
  args: {
    placement: 'top',
    trigger: 'click'
  } as TooltipProps,
  argTypes: {
    placement: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
    trigger: {
      options: ['click', 'hover', 'focus', ['click', 'hover']],
      control: { type: 'radio' },
    }
  },
};
