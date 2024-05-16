import React, { useMemo } from 'react';
import Progress, { ProgressProps } from './Progress';
import dayjs from 'dayjs';
import { useCountdown } from '@components/Countdown';
import { formatDuration } from '@utils/formatDuration';

export default {
  component: Progress,
};

export const Default = {
  render: (args) => <Progress {...args} />,
  args: {
    percent: 50,
  } as ProgressProps,
};

export const WithText = {
  render: (args) => <Progress {...args} />,
  args: {
    height: 26,
    percent: 10,
    textLeft: 'Lorem ipsum dolor sit amet',
    textRight: '14%',
  } as ProgressProps,
};

export const AsTimer = {
  render: (args) => {
    const targetDate = useMemo(() => dayjs().add(1, 'minute').valueOf(), []); // 100%
    const initialDiff = useMemo(() => targetDate - Date.now(), [targetDate]);
    const countDown = useCountdown({
      targetDate,
    });

    return (
      <Progress
        text={`Ends in ${formatDuration(countDown)}`}
        percent={countDown / initialDiff * 100}
        {...args}
      />
    );
  },
  args: {
    height: 26,
  } as ProgressProps,
};
