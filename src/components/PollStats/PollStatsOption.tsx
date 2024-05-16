import Tooltip from '@components/Tooltip';
import Text, { TextProps } from '@components/Text';
import React from 'react';
import { Progress } from '@components/Progress';
import styles from './PollStatsOption.module.less';
import { PollOption } from './types';
import { formatPercent } from '@utils/numberFormatters';

export type PollStatsOptionProps = PollOption & {
  choiced?: boolean;
  choicedText?: string;
  hightlighted?: boolean;
  textInside?: boolean;
  progressHeight?: number;
  percentageTextProps?: TextProps;
}

export const PollStatsOption: React.FC<PollStatsOptionProps> = ({
  name,
  tooltip,
  choiced,
  choicedText = 'your choice',
  percentage,
  hightlighted = true,
  textInside = false,
  progressHeight,
  percentageTextProps = { bold: true },
}) => {
  return (
    <Tooltip
      placement="right"
      overlay={tooltip && <Text>{tooltip}</Text>}
    >
      <div>
        {!textInside && (
          <div className={styles.content}>
            <Text className={styles.optionName}>
              {name} {choiced && `(${choicedText})`}
            </Text>
            <Text {...percentageTextProps}>{formatPercent(percentage)}</Text>
          </div>
      )}
        <Progress
          percent={percentage}
          highlighted={hightlighted}
          textLeft={textInside && (choiced ? `${name} (${choicedText})` : name)}
          textRight={textInside && formatPercent(percentage)}
          height={progressHeight}
        />
      </div>
    </Tooltip>
  );
};
