import React, { memo, useEffect, useMemo, useState } from 'react';
import { Text, TextProps } from '@components/Text';
import { withClientOnly } from '@components/ClientOnly';
import { formatDuration } from '@utils/formatDuration';

export type CountdownProps = TextProps & {
  value: number | Date
  format?: string
  onFinish?: () => void
}

export type UseCountdownProps = {
  targetDate: number | Date
  onFinish?: () => void
  format?: string
}

export const useCountdown = ({
  targetDate,
  onFinish,
}: UseCountdownProps) => {
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

  return countDown;
};

const Countdown: React.FC<CountdownProps> = ({
  value: targetDate,
  format = 'HH:mm:ss',
  size = 'inherit',
  bold = true,
  onFinish,
  ...props
}) => {
  const countDown = useCountdown({
    targetDate,
    onFinish,
    format,
  });

  return (
    <Text
      color="primary"
      size={size}
      bold={bold}
      {...props}
    >
      {formatDuration(countDown, format)}
    </Text>
  );
};

export default memo(withClientOnly(Countdown));
