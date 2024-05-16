import React from 'react';
import Skeleton from '@components/Skeleton';
import { PollStatsOption } from './PollStatsOption';
import { PollOption } from './types';
import { TextProps } from '@components/Text';

export type PollStatsProps = {
  loading?: boolean;
  options: PollOption[];
  userChoice?: string | number;
  winner?: string | number;
  textInside?: boolean;
  progressHeight?: number;
  percentageTextProps?: TextProps;
}

export const PollStats: React.FC<PollStatsProps> = ({
  loading,
  options,
  userChoice,
  winner,
  textInside,
  progressHeight,
  percentageTextProps = { bold: true },
}) => {
  if (loading) {
    return (
      <Skeleton />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: textInside ? 0 : 8 }}>
      {options.map((option) => {
        return (
          <PollStatsOption
            {...option}
            progressHeight={progressHeight}
            textInside={textInside}
            key={option.id}
            percentageTextProps={percentageTextProps}
            choiced={!winner && userChoice === option.id}
            hightlighted={winner ? option.id === winner : userChoice === option.id}
          />
        );
      })}
    </div>
  );
};
