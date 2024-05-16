import React, { useCallback, useState } from 'react';
import { Meta } from '@storybook/react';
import Mentions from './Mentions';
import { TextAreaInputWrapper as TextArea } from '@components/input';
import { LOADING_STATUSES } from '@const/loading-statuses';

export default {
  component: Mentions,
} as Meta<typeof Mentions>;

const data = [
  { username: 'test' },
  { username: 'akoriagin' },
  { username: 'zhenya' },
  { username: 'timofey' },
  { username: 'astro' },
  { username: 'zalgo' },
];


export const Default = {
  render: () => {
    const [text, setText] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(LOADING_STATUSES.NOT_STARTED);

    const getSuggestions = useCallback(async (query: string) => {
      if (!query) return data;
      setLoadingStatus(LOADING_STATUSES.LOADING);
      await (new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      }));
      setFiltered(data.filter(i => i.username.toLowerCase().includes(query.toLowerCase())));
      setLoadingStatus(LOADING_STATUSES.SUCCESS);
    }, []);

    return (
      <Mentions
        suggestions={filtered}
        refreshSuggestions={getSuggestions}
        suggestionsLoadingStatus={loadingStatus}
        renderSuggestionItem={(item) => item.username}
      >
        <TextArea
          placeholder="What’s going on?!"
          value={text}
          outlined
          onChange={setText}
        />
      </Mentions>
    );
  },
};
