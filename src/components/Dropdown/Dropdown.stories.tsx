import React from 'react';
import { Meta } from '@storybook/react';
import Dropdown from './Dropdown';
import Menu from '@components/Menu';
import Text from '@components/Text';
import Button from '@components/buttons';
import IconWallet from '@icons/wallet.svg';

export default {
  component: Dropdown,
} as Meta<typeof Dropdown>;

const overlay = (
  <Menu>
    <Menu.Item>
      <Text size="body1">Menu item 1</Text>
    </Menu.Item>
    <Menu.Item>
      <Text size="body1">Menu item 2</Text>
    </Menu.Item>
    <Menu.Item icon={IconWallet}>
      <Text size="body1">Menu item 3</Text>
    </Menu.Item>
  </Menu>
);

export const Default = {
  render: (args) => (
    <Dropdown
      {...args}
      placement="left"
      overlay={overlay}
    >
      <Button size="small">Trigger</Button>
    </Dropdown>
  ),
};
