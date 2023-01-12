import classNames from 'classnames';
import { Text } from '@components/Text';
import styles from './Explanation.module.less';
import IconInfo from '@icons/info.svg';
import FailIcon from '@icons/fail.svg';
import React, { HTMLProps } from 'react';

export type ExplanationProps = HTMLProps<HTMLDivElement> & {
  type?: 'info' | 'warning',
  children: React.ReactNode
}

const colorByType = {
  info: 'var(--color-primary)',
  warning: 'var(--color-red)',
};

const textColorByType = {
  info: 'primary',
  warning: 'red',
};

const iconByType = {
  info: <IconInfo color={colorByType.info} className={styles.icon} />,
  warning: <FailIcon color={colorByType.warning} className={styles.icon} />,
};

const Explanation: React.FC<ExplanationProps> = ({
  children,
  type = 'info',
  ...props
}) => {
  return (
    <div className={classNames(styles.wrapper, styles[type])} {...props}>
      {iconByType[type]}
      <Text color={textColorByType[type]} size="body1">{children}</Text>
    </div>
  );
};

export default Explanation;
