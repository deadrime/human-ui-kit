import React from 'react';
import RcTooltip from 'rc-tooltip';
import type { TooltipProps } from 'rc-tooltip/es/Tooltip';
import styles from './Tooltip.module.less';
import 'rc-tooltip/assets/bootstrap.css';
import classNames from 'classnames';

const Tooltip: React.FC<TooltipProps> = (props) => {
  if (!props.overlay) {
    return props.children;
  }
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
