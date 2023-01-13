import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import React, { FC, useCallback, useState } from 'react';
import { IconButton } from '@components/buttons';
import styles from './ExpirationTimer.module.less';
import { Tooltip } from '@components/Tooltip';

export interface ExpirationTimerProps {
  onExpired: () => void;
  expirationInterval: number;
  tooltip?: string;
  infinite?: boolean
}

export const ExpirationTimer: FC<ExpirationTimerProps> = ({
  expirationInterval,
  tooltip,
  onExpired,
  infinite = true,
}) => {
  const [key, setKey] = useState(0);

  const handleEnd = useCallback(() => {
    if (infinite) {
      setKey(key => key + 1);
    }
    onExpired?.();
  }, [infinite, onExpired]);

  return (
    <Tooltip overlay={tooltip} trigger={'click'}>
      <IconButton
        size="small"
        icon={<CountdownCircleTimer
          size={20}
          isPlaying
          key={key}
          trailStrokeWidth={2.5}
          duration={expirationInterval}
          strokeWidth={2.5}
          trailColor={'var(--color-gray-500)' as any}
          colors={'var(--color-primary)' as any}
          onComplete={handleEnd}
        />}
        variant="secondary"
        transparent
        className={styles.resetButton}
        onClick={handleEnd}
      />
    </Tooltip>
  );
};
