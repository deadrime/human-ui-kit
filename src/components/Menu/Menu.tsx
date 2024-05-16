import React, { CSSProperties, HTMLProps } from 'react';
import styles from './Menu.module.less';
import Text, { TextProps } from '@components/Text';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner';
import InternalLink from '@components/InternalLink/InternalLink';

export type MenuItemProps = {
  children: React.ReactElement | string
  icon?: React.VFC<React.SVGProps<SVGSVGElement>> | React.ReactElement
  id?: string | number
  textProps?: Omit<TextProps, 'ref'>
  className?: string
  href?: string
  target?: string
  onClick?: (key: MenuItemProps['id'], event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void
  loading?: boolean;
  disabled?: boolean;
}

const defaultIconProps: React.SVGProps<SVGSVGElement> = { width: 20, height: 20 };

type MenuItemWrapperProps = React.HTMLAttributes<HTMLElement> & {
  href?: string
  target?: string
  rel?: string
  children?: React.ReactNode,
  onClick?: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void
  disabled?: boolean;
}

const MenuItemWrapper: React.FC<MenuItemWrapperProps> = ({
  href,
  target,
  rel,
  children,
  onClick,
  ...props
}) => href ? (
  <InternalLink
    href={href}
    target={target}
    rel={rel}
    onClick={onClick}
    role="menuitem"
    {...props}
  >
    {children}
  </InternalLink>
) : (
  <button
    {...props}
    onClick={onClick}
    role="menuitem"
  >
    {children}
  </button>
);

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  icon,
  className,
  textProps = {},
  id,
  onClick,
  href = '',
  target,
  loading = false,
  disabled = false,
}) => (
  <MenuItemWrapper
    href={href}
    rel="noreferrer"
    target={target}
    className={classNames(styles.menuItem, className)}
    onClick={(event) => onClick?.(id, event)}
    disabled={loading || disabled}
  >
    {
      loading ?
        <Spinner size={'small'} /> :
        icon && typeof icon === 'function'
          ? React.createElement(icon, defaultIconProps)
          : <>{icon}</>
    }
    <Text
      size="body1"
      {...textProps}
      className={classNames(styles.menuItemText, textProps.className)}
    >
      {children}
    </Text>
  </MenuItemWrapper>
);

export type MenuDividerProps = HTMLProps<HTMLDivElement>

export const MenuDivider: React.FC<MenuDividerProps> = (props) =>
  <div className={styles.menuDivider} {...props} role="separator" />;

export type MenuProps = {
  children: React.ReactElement | React.ReactElement[]
  mode?: 'horizontal' | 'vertical'
  gap?: number | string
  className?: string
}

export interface CompoundedMenuComponent extends React.FC<MenuProps> {
  Item: React.FC<MenuItemProps>
  Divider: React.FC<MenuDividerProps>
}

export const Menu: CompoundedMenuComponent = ({
  children,
  mode = 'vertical',
  gap,
  className,
}) => (
  <div
    role="menu"
    aria-orientation={mode}
    style={gap && { '--customGap': typeof gap === 'string' ? gap : `${gap}px` } as CSSProperties}
    className={classNames(styles.menu, styles[mode], className)}
  >
    {children}
  </div>
);

Menu.Item = MenuItem;
Menu.Divider = MenuDivider;

export default Menu;
