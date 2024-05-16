import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { Tabs, TabsProps } from './Tabs';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Tabs,
} as Meta<typeof Tabs>;

const tabs = [
  { key: '1', title: 'Tab one', body: () => <>Content 1</> },
  { key: '2', title: 'Tab two', body: () => <>Content 2</> },
  { key: '3', title: 'Tab three', body: () => <>Content 3</> },
  { key: '4', title: 'Tab four', body: () => <>Content 4</> },
  { key: '5', title: 'Tab five', body: () => <>Content 5</> },
  { key: '6', title: 'Tab six', body: () => <>Content 6</> },
  { key: '7', title: 'Tab 7', body: () => <>Content 7</> },
  { key: '8', title: 'Tab 8', body: () => <>Content 8</> },
];

export const Default = {
  render: (args) => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    return (
      <div>
        <Tabs
          {...args}
          activeTabKey={activeTabKey}
          onActiveTabChange={setActiveTabKey}
        />
      </div>
    );
  },
  args: {
    showActiveTabIndicator: true,
    tabs,
    tabsJustify: 'start',
  } as Partial<TabsProps>,
};
