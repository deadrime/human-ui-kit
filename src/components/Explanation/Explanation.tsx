import classNames from 'classnames';
import { Text, TextProps } from '@components/Text';
import styles from './Explanation.module.less';
import IconInfo from '@icons/info.svg';
import FailIcon from '@icons/fail.svg';
import React, { HTMLProps } from 'react';

export type ExplanationProps = HTMLProps<HTMLDivElement> & {
  type?: 'info' | 'warning';
  children: React.ReactNode;
  showIcon?: boolean;
  textProps?: TextProps;
  footer?: React.ReactElement;
}

const iconByType = {
  info: <IconInfo className={styles.icon} />,
  warning: <FailIcon className={styles.icon} />,
};

const Explanation: React.FC<ExplanationProps> = ({
  children,
  type = 'info',
  className,
  showIcon = true,
  textProps = {},
  footer,
  ...props
}) => {
  return (
    <div className={classNames(styles.wrapper, styles[type], className)} {...props}>
      <div className={styles.iconText}>
        {showIcon && iconByType[type]}
        <Text size="body1" className={styles.text} {...textProps}>{children}</Text>
      </div>
      {footer}
    </div>
  );
};

export default Explanation;
