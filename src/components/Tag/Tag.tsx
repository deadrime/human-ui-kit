import React, { HTMLProps } from 'react';
import { IconButton } from '@components/buttons';
import Text from '@components/Text';
import styles from './Tag.module.less';
import CloseIcon from '@icons/close.svg';
import classNames from 'classnames';

export type TagProps = HTMLProps<HTMLSpanElement> & {
  children?: React.ReactElement | string
  closable?: boolean
  onClose?: (e: React.MouseEvent<HTMLElement>) => void
}

const Tag: React.FC<TagProps> = ({ children, closable, className, onClose }) => (
  <span
    className={classNames(styles.tag, className)}
  >
    <Text className={styles.children}>{children}</Text>
    {closable && (
      <IconButton
        size="xSmall"
        variant="secondary"
        filled
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          onClose(event);
        }}
        icon={<CloseIcon width={20} />}
      />
    )}
  </span>
);

export default Tag;
