import React, { forwardRef } from 'react';
import classnames from 'classnames';
import classNames from 'classnames';
import styles from './Text.module.less';
import './typography.less';

export type FontSize = 'title0' |
'title1' |
'title2' |
'title3' | 'title4'|
// TODO: title 5 should be removed onc new pages are ready.
'title5' |
'body1'|
'body2' |
'inherit'

export interface TextProps extends Omit<React.HTMLProps<Element>, 'size' | 'ref' | 'children'> {
  tag?: string,
  size?: FontSize,
  color?: string,
  family?: 'syne' | 'cerebri',
  sm?: FontSize,
  md?: FontSize,
  lg?: FontSize,
  normal?: boolean,
  medium?: boolean;
  semibold?: boolean,
  bold?: boolean,
  extrabold?: boolean,
  uppercase?: boolean,
  block?: boolean;
  children?: React.ReactNode
}

export interface CompoundedComponent extends React.ForwardRefExoticComponent<TextProps & React.RefAttributes<Element>> {
  Link: React.FC<TextLinkProps>,
  Paragraph: React.FC<TextProps>,
  Button: React.FC<TextProps>
}

export const Text = forwardRef<Element, TextProps>(({
  tag = 'span',
  size = 'inherit',
  uppercase = false,
  family = 'cerebri',
  color,
  normal,
  medium,
  semibold,
  bold,
  extrabold,
  sm,
  md,
  lg,
  className,
  children,
  style,
  block,
  ...props
}, ref) => {

  return (
    React.createElement(tag, {
      ref,
      style: {
        'color': color && `var(--color-${color})`,
        display: block ? 'block' : undefined,
        ...style,
      },
      className: classnames(
        `text-${size}`,
        {
          [`font-${family}`]: family.toLowerCase(),
          [`sm:text-${sm}`]: sm,
          [`md:text-${md}`]: md,
          [`lg:text-${lg}`]: lg,
          'font-normal': normal,
          'font-medium':  medium,
          'font-semibold': semibold,
          'font-bold': bold,
          'font-extrabold': extrabold,
          'text-uppercase': uppercase,
        },
        className
      ),
      ...props,
    }, children)
  );
}) as CompoundedComponent;

export interface TextLinkProps extends TextProps {
  variant?: 'primary' | 'secondary',
  before?: React.ReactNode,
  after?: React.ReactNode,
}

const TextLink = forwardRef<Element, TextLinkProps>(({ before, after, variant = 'primary', onClick, disabled, ...props }, ref) => {
  const children = typeof props.children === 'string' ? <span>{props.children}</span> : props.children;

  return (
    <Text
      {...props}
      disabled={disabled}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick?.(e);
      }}
      className={classNames(props.className, 'link', {
      [`link-${variant}`]: variant,
    })}
      tag={props.tag || 'a'}
      tabIndex={!disabled ? 0 : undefined}
      ref={ref}
    >
      {before}
      {children}
      {after}
    </Text>
  );
});

Text.Link = TextLink;

const TextButton = forwardRef<Element, TextProps>((props, ref) => React.createElement(Text, {
  ...props,
  className: classNames(props.className, styles.textButton),
  tag: props.tag || 'button',
  ref,
}));

Text.Button = TextButton;

const TextParagraph = forwardRef<Element, TextProps>((props, ref) => React.createElement(Text, {
  ...props,
  tag: 'p',
  ref,
}));

Text.Paragraph = TextParagraph;

export const MainTitle = forwardRef<Element, TextProps>(({
  children,
  style,
  ...props
}, ref) => (
  <Text
    {...props}
    size="body1"
    sm="title4"
    extrabold
    uppercase
    family="syne"
    style={{
      display: 'block',
      ...style,
    }}
    ref={ref}
  >
    {children}
  </Text>
));

export default Text;
