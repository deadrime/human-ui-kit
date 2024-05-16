import React, { useState } from 'react';
import InlineSelect from './InlineSelect';
import IconWallet from '@icons/wallet.svg';
import Text from '../Text';

export default {
  component: InlineSelect,
};

export const Default = {
  render: () => {
    const options = [
      {
        label: 'Simple text',
        value: 'sol',
      },
      {
        label: <Text size="title4" extrabold family="syne">Custom text</Text>,
        value: 'moonpay',
      },
      {
        label: <><IconWallet /><Text>With icon</Text></>,
        value: 'transak',
      },
    ];
    const [value, setValue] = useState('sol');

    return (
      <div style={{ padding: 16, background: 'rgba(0, 0, 0, .2)' }}>
        <InlineSelect options={options} value={value} onChange={setValue} />
      </div>
    );
  },
};
