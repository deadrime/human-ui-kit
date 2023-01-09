import React from 'react';
import RcTooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import styles from './Tooltip.module.less';
import 'rc-tooltip/assets/bootstrap.css';
import classNames from 'classnames';

const Tooltip: React.FC<TooltipProps> = (props) => {
  return (
    <RcTooltip
      {...props}
      placement={props.placement || 'top'}
      prefixCls={props.prefixCls || styles.tooltip}
      overlayClassName={classNames(props.overlayClassName, styles.overlay)}
    />
  );
};

export default Tooltip;
