import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { Text, TextProps } from '@components/Text';
import { withClientOnly } from '@components/ClientOnly';

dayjs.extend(duration);

type CountdownProps = TextProps & {
  value: number | Date
  format?: string
  onFinish?: () => void
}

const Countdown: React.FC<CountdownProps> = ({
  value: targetDate,
  format = 'HH:mm:ss',
  size = 'inherit',
  bold = true,
  onFinish,
  ...props
}) => {
  const countDownDate = useMemo(() => new Date(targetDate).valueOf(), [targetDate]);

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().valueOf()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = countDownDate - new Date().valueOf();
      if (diff <= 0) {
        clearInterval(interval);
        setCountDown(0);
        onFinish?.();
        return;
      } else {
        setCountDown(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate, onFinish]);

  return (
    <Text
      color="primary"
      size={size}
      bold={bold}
      {...props}
    >
      {dayjs.duration(countDown).format(format)}
    </Text>
  );
};

export default memo(withClientOnly(Countdown));
