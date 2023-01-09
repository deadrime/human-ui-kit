import React from 'react';
import { Meta } from '@storybook/react';
import Carousel from './Carousel';
import { times } from 'lodash';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Carousel,
} as Meta<typeof Carousel>;

const Slide = ({ index }) => <div style={{ width: '20vw', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'yellow'}}>
  {index}
</div>

export const Default = {
  render: (args) => <>
    <Carousel {...args}>
      {times(10).map(i => <Slide index={i} key={i}/>)}
    </Carousel>
  </>,
  args: {
    navigation: true
  }
};
