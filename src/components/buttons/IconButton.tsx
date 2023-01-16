import classNames from 'classnames';
import React from 'react';
import Button, { ButtonProps } from './Button';
import Badge from '@components/Badge';

export type IconButtonSize = 'xSmall' | 'small' | 'medium' | 'large';

export type IconButtonShape = 'square' | 'round';

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  shape?: IconButtonShape;
  size?: IconButtonSize;
  count?: number;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
  icon,
  shape = 'round',
  size = 'small',
  className,
  count,
  ...other
}, ref) => {
  return (
    <Button
      {...other}
      ref={ref}
      size={size}
      icon={icon}
      pureChildren
      className={
        classNames('btn--icon-only', {
          [`btn--icon--${shape}`]: shape,
          ['btn--filled btn--filled-outline']: other.filled && other.outlined,
        },
        className
      )}
    >
      {!!count && <Badge count={count} />}
    </Button>
  );
});

export default IconButton;
