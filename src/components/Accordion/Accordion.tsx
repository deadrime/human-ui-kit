import React, { useCallback, useMemo, useState } from 'react';
import IconPlus from '@icons/plus-rounded.svg';
import IconMinus from '@icons/minus.svg';
import styles from './Accordion.module.less';
import Text, { TextProps } from '@components/Text';
import classNames from 'classnames';
import AnimateHeight from 'react-animate-height';

export type AccordionSummaryProps = {
  ExpandIcon?: React.ReactElement;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
} & TextProps;

export const AccordionSummary: React.FC<AccordionSummaryProps> = ({
  ExpandIcon,
  children,
  onClick,
  className,
  ...props
}) => {
  return (
    <summary onClick={onClick} className={classNames(className, styles.summary)} tabIndex={0}>
      <div className={styles.summaryInner}>
        {React.cloneElement(ExpandIcon, {
          width: 14,
          height: 14,
          className: classNames(ExpandIcon?.props, styles.summaryIcon),
        })}
        <Text size="body1" medium {...props}>
          {children}
        </Text>
      </div>
    </summary>
  );
};

AccordionSummary.displayName = 'AccordionSummary';

export const AccordionDetails: React.FC<TextProps> = ({ children, className, ...props }) => {
  return (
    <Text
      size="body2"
      block
      className={classNames(className, styles.accordionContent)}
      {...props}
    >{children}</Text>
  );
};

AccordionDetails.displayName = 'AccordionDetails';

export type AccordionSize = 'normal' | 'large';

export type AccordionProps = {
  size?: AccordionSize;
  children: React.ReactElement[];
  open?: boolean;
  onChange?: (open: boolean) => void;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  open: userOpen,
  onChange,
  size = 'normal',
}) => {
  const [controlledOpen, setControlledOpen] = useState(userOpen);
  const open = typeof userOpen === 'boolean' ? userOpen : controlledOpen;
  const summary = children.find(({ type }) => type?.['displayName'] === 'AccordionSummary');
  const content = children.find(({ type }) => type?.['displayName'] === 'AccordionDetails');

  const onToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setControlledOpen(value => !value);
    onChange?.(!open);
  }, [onChange, open]);

  const ExpandIcon = useMemo(() => open ? <IconMinus /> : <IconPlus />, [open]);

  return (
    <details open={open} className={classNames(styles.accordion, styles[size])}>
      {React.cloneElement(summary, {
        ExpandIcon,
        onClick: onToggle,
      })}
      <AnimateHeight duration={300} height={open ? 'auto' : 0}>
        {content}
      </AnimateHeight>
    </details>
  );
};
interface CompoundedAccordionProps extends React.FC<AccordionProps> {
  Summary: React.FC<AccordionSummaryProps>
  Details: React.FC<TextProps>
}

const CompoundedAccordion: CompoundedAccordionProps = Accordion as CompoundedAccordionProps;
CompoundedAccordion.Summary = AccordionSummary;
CompoundedAccordion.Details = AccordionDetails;

export default CompoundedAccordion;
