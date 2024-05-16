import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { TextInputWrapper } from './TextInputWrapper';
import { TextAreaInputWrapper } from './TextAreaInputWrapper';
import { CurrencyInputWrapper } from './CurrencyInputWrapper';
import { DateInputWrapper } from './DateInputWrapper';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: TextInputWrapper,
} as Meta<typeof TextInputWrapper>;

export const TextInput = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <TextInputWrapper
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    placeholder: 'Some placeholder',
  },
};

export const TextArea = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <TextAreaInputWrapper
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    placeholder: 'Some placeholder',
  },
};

export const CurrencyInput = {
  render: (args) => {
    const [value, setValue] = useState(1000);

    return (
      <>
        <div>
          Value: {value}
        </div>
        <CurrencyInputWrapper
          {...args}
          value={value}
          onChange={setValue}
        />
      </>
    );
  },
  args: {
    placeholder: 'Some placeholder',
    decimals: 4,
  },
};

export const DateInput = {
  render: () => {
    const [date, setDate] = useState(new Date());
    console.log({ date });

    return (
      <DateInputWrapper
        value={date}
        onChange={setDate}
        min={new Date()}
      />
    );
  },
};

export const Default = TextInput;
