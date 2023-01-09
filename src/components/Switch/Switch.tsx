import React from 'react';
import RcSwitch, { SwitchChangeEventHandler, SwitchClickEventHandler } from 'rc-switch';
import styles from './Switch.module.less';

export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange' | 'onClick'> {
  className?: string;
  prefixCls?: string;
  disabled?: boolean;
  onChange?: SwitchChangeEventHandler;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  onClick?: SwitchClickEventHandler;
  tabIndex?: number;
  checked?: boolean;
  defaultChecked?: boolean;
  loadingIcon?: React.ReactNode;
  style?: React.CSSProperties;
  title?: string;
}

const Switch: React.FC<SwitchProps> = (props) => {
  return <RcSwitch {...props} prefixCls={styles.switch} />;
};

export default Switch;
