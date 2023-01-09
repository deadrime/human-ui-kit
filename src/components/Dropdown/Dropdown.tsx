import classNames from 'classnames';
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useClickAway } from 'react-use';
import styles from './Dropdown.module.less';

export type DropdownProps = {
  overlay: React.ReactElement,
  children: React.ReactElement,
  placement?: 'right' | 'left',
  onChange?: (open: boolean, event?: React.MouseEvent<HTMLElement>) => void,
  overlayClassName?: string,
  summaryClassName?: string,
  className?: string,
  open?: boolean,
  style?: CSSProperties,
  destroyOnClose?: boolean,
  preventBodyScroll?: boolean,
  focusOnOpen?: boolean
  closeOnClickAway?: boolean
  overlayAnimated?: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({
  open = false,
  overlay,
  children,
  onChange,
  overlayClassName,
  summaryClassName,
  placement = 'right',
  className,
  style,
  destroyOnClose = false,
  preventBodyScroll = false,
  closeOnClickAway = false,
  focusOnOpen = true,
  overlayAnimated = true,
}) => {
  const ref = useRef<HTMLDivElement>();
  const detailsRef = useRef<HTMLDivElement>();

  const [transitioning, setTransitioning] = useState(false);
  const [transitioningFinished, setTransitioningFinished] = useState(true);

  useEffect(() => {
    if (open && focusOnOpen) {
      ref.current?.focus();
    }
  }, [open, focusOnOpen]);

  const handleChangeOpen = useCallback((open: boolean) => {
    if (open) {
      if (preventBodyScroll) {
        document.body.style.overflowY = 'hidden';
      }
    } else {
      if (overlayAnimated) {
        setTransitioning(true);
        setTransitioningFinished(false);
      }
      if (preventBodyScroll) {
        document.body.style.overflowY = 'auto';
      }
    }
  }, [preventBodyScroll, overlayAnimated]);

  const toggleOpen = useCallback((event: any) => {
    event.stopPropagation();
    event.preventDefault();
    onChange?.(!open, event);
    handleChangeOpen(!open);
  }, [handleChangeOpen, onChange, open]);

  useClickAway(detailsRef, () => {
    if (!open) {
      return;
    }
    if (!closeOnClickAway) {
      return;
    }
    onChange?.(false);
    handleChangeOpen(false);
  });

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      event.stopPropagation();
      onChange?.(false);
      if (preventBodyScroll) {
        document.body.style.overflowY = 'auto';
      }
    }
  }, [preventBodyScroll, open, onChange]);

  useEffect(() => {
    if (!detailsRef.current) {
      return;
    }
    const details = detailsRef.current;
    details.addEventListener('keydown', handleKeydown);

    return () => {
      details.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  // useEffect(() => {
  //   // There is some next.js optimisation, so if you go to any other page - useEffect cleanup function doesn't triggered.
  //   // Because of that i subscribe to `beforeHistoryChange` event to return initial `body` styles and allow scroll
  //   const handleChangeHistory = () => {
  //     onChange?.(false);
  //     document.body.style.overflowY = 'auto';
  //   };
  //   Router.events.on('beforeHistoryChange', handleChangeHistory);
  //   return () => {
  //     Router.events.off('beforeHistoryChange', handleChangeHistory);
  //   };
  // }, [onChange]);

  const applyOpenedStyles = open || (overlayAnimated && !open && !transitioningFinished);

  return (
    <div
      style={style}
      className={classNames(styles.dropdown, className, {
        [styles.open]: applyOpenedStyles,
      })}
      ref={detailsRef}
    >
      <div className={classNames(styles.summary, summaryClassName)} ref={ref} onClick={toggleOpen}>
        {children}
      </div>
      {
        (open || !destroyOnClose) &&
          <CSSTransition
            in={transitioning}
            className={classNames(styles.overlay, styles[placement], overlayClassName)}
            timeout={200}
            onEntered={() => {
              setTransitioning(false);
            }}
            onExiting={() => {
              setTransitioningFinished(true);
            }}
          >
            <div>
              {overlay}
            </div>
          </CSSTransition>
      }
    </div>
  );
};

const ControlledDropdown = (props: DropdownProps) => {
  const [open, setOpen] = useState(!!props.open);

  return (
    <Dropdown
      {...props}
      open={typeof props.open === 'undefined' ? open : props.open}
      onChange={(value, event) => {
        setOpen(value);
        props.onChange?.(value, event);
      }}
    />
  );
};

export default ControlledDropdown;
