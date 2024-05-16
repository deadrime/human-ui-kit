import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import Select from './Select';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Select,
} as Meta<typeof Select>;


const options = [
  { label: 'Art', value: 'art' },
  { label: 'Content', value: 'content' },
  { label: 'Crypto', value: 'crypto' },
  { label: 'Music', value: 'music' },
  { label: 'NFT', value: 'nft' },
  { label: 'Sport', value: 'sport' },
  { label: 'Tech', value: 'tech' },
];

export const Default = {
  render: (args) => {
    const [selected, setSelected] = useState<any>([]);

    return (
      <Select
        {...args}
        value={selected}
        onChange={setSelected}
        placeholder="Select all that apply"
        mode="multiple"
        options={options}
        style={{ width: '100%', marginBottom: 40 }}
      />
    );
  },
};
