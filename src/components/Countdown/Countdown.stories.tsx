import React from 'react';
import Countdown, { CountdownProps } from './Countdown';
import dayjs from 'dayjs';

export default {
  component: Countdown,
};

export const Default = {
  render: (args) => <Countdown {...args} />,
  args: {
    value: dayjs().add(10, 'minute').valueOf(),
  } as CountdownProps,
};
