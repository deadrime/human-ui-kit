import React from 'react';
import { Meta } from "@storybook/react";
import Typography from "./Text";

export default {
  component: Typography,
} as Meta<typeof Typography>;

export const Default = {
  render: (args) => <Typography {...args}>Lorem ipsum</Typography>
}
