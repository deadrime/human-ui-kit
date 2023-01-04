import React from 'react';
import { Meta } from "@storybook/react";
import Card from "./Card";

export default {
  component: Card,
} as Meta<typeof Card>;

export const Default = {
  render: (args) => <Card {...args}>Some text</Card>
};
