import React from 'react';
import { Meta } from "@storybook/react";
import Badge, { BadgeWrapper } from "./Badge";

export default {
  component: Badge,
} as Meta<typeof Badge>;

export const Default = {
  render: (args) => <div style={{ width: 20}}><Badge {...args}/></div>,
  args: {
    count: 10
  }
};

export const AsWrapper = {
  render: (args) => <div style={{ display: 'flex' }}>
    <BadgeWrapper {...args}>
      Some text
    </BadgeWrapper>
  </div>,
  args: {
    count: 10
  }
}
