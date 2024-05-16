import React from 'react';
import Expander, { ExpanderProps } from './Expander';

export default {
  component: Expander,
};

export const Default = {
  render: (args) => <Expander {...args} />,
  args: {
    header: 'Some header',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet nisl suscipit risus dignissim feugiat sit amet et est. Quisque sodales non erat et lobortis. Maecenas sit amet est et nisi volutpat lacinia. Mauris a pulvinar lacus, a hendrerit enim. Quisque in vestibulum purus. Curabitur pharetra malesuada est, vitae mollis massa faucibus in. Donec et facilisis neque. Aliquam quis massa in felis scelerisque tincidunt.',
  } as ExpanderProps,
};
