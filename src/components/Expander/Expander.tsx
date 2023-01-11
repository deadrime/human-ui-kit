import classNames from 'classnames';
import React, { CSSProperties, FC, ReactElement, ReactNode, useCallback, useRef, useState } from 'react';
// TODO: Do we really need this?
import AnimateHeight from 'react-animate-height';
import ArrowUpIcon from 'ui/components/icons/arrow-up.svg';
import styles from './Expander.module.less';

interface ExpanderProps {
  header: ReactNode;
  children: ReactElement;
  className?: string;
  style?: CSSProperties;
}

interface ManagedExpanderProps extends ExpanderProps {
  open: boolean;
  onToggled: (open: boolean) => void;
}

const DURATION = 400;

export const ManagedExpander: FC<ManagedExpanderProps> = ({ header, children, open, className, onToggled, style }) => {
  const [bodyHeight, setBodyHeight] = useState<any>(0);
  const timerId = useRef(null);
  const detailsRef = useRef(null);

  const toggle = useCallback((e) => {
    e.preventDefault();
    if (open) {
      setBodyHeight(0);
      timerId.current = setTimeout(() => {
        onToggled(false);
        detailsRef.current.dispatchEvent(new Event('onToggle'));
      }, DURATION);
    } else {
      setBodyHeight('auto');
      onToggled(true);
      detailsRef.current.dispatchEvent(new Event('onToggle'));
    }
  }, [onToggled, open]);

  return (
    <details
      ref={detailsRef}
      style={style}
      onClick={toggle}
      open={open}
      className={classNames(styles.expander, {
        [styles.expanderOpen]: open,
      }, className)}
    >
      <summary
        className={styles.expanderHeader}
        tabIndex={-1}
      >
        <div className={styles.expanderInner}>
          {header}
          <ArrowUpIcon
            width={20}
            tabIndex={0}
            style={{ transform: `rotate(${open ? 0 : 180}deg)` }}
          />
        </div>
      </summary>
      <AnimateHeight duration={DURATION} height={bodyHeight}>
        <div className={styles.expanderBody} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </AnimateHeight>
    </details>
  );
};

export const Expander: FC<ExpanderProps> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <ManagedExpander
      open={open}
      onToggled={(open) => {
        setOpen(open);
      }}
      {...props}
    />
  );
};
