import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import AutoComplete, { AutocompleteProps } from './AutoComplete';
import Text from '@components/Text';

export default {
  component: AutoComplete,
} as Meta<typeof AutoComplete>;

const data = [
  { label: 'Art', value: 'art' },
  { label: 'Anime', value: 'anime' },
  { label: 'Content', value: 'content' },
  { label: 'Crypto', value: 'crypto' },
  { label: 'Music', value: 'music' },
  { label: 'NFT', value: 'nft' },
  { label: 'Sport', value: 'sport' },
  { label: 'Tech', value: 'tech' },
];

const getSuggestions = async (query: string) => {
  if (!query) return data;

  return data.filter(i => i.label.toLowerCase().includes(query.toLowerCase())).map(item => ({
    value: item.value,
    label: <Text>{item.label}</Text>,
  }));
};

export const SuggestionsMode = {
  render: (args) => {
    const [selected, setSelected] = useState(null);

    return (
      <AutoComplete
        {...args}
        value={selected}
        getSuggestions={getSuggestions}
        onChange={setSelected}
      />
    );
  },
  args: {
    placeholder: 'Type to see suggestions',
    mode: 'suggestions',
  } as AutocompleteProps,
};

export const SelectMode = {
  render: (args) => {
    const [selected, setSelected] = useState(null);

    return (
      <AutoComplete
        {...args}
        value={selected}
        getSuggestions={getSuggestions}
        onChange={setSelected}
      />
    );
  },
  args: {
    placeholder: 'Type to see suggestions',
    mode: 'select',
  } as AutocompleteProps,
};
