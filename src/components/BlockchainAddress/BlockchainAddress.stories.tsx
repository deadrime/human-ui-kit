import React from 'react';
import { Meta } from '@storybook/react';
import BlockchainAddress, { BlockchainAddressProps } from './BlockchainAddress';

export default {
  component: BlockchainAddress,
} as Meta<typeof BlockchainAddress>;

export const Default = {
  render: (args) => <BlockchainAddress {...args} />,
  args: {
    address: 'y3xTFb1EPZqrUp4EKzUuinJn1Fa5ywJAgG5xyiZLqQj',
  } as BlockchainAddressProps,
};
