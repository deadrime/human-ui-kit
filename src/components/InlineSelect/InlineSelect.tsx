import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import { Text } from '../Text';
import styles from './InlineSelect.module.less';

type InlineSelectItem<T> = {
  value: T;
  label: React.ReactNode;
}

type ItemProps = InlineSelectItem<unknown> & {
  onSelect: (value: any) => void
  selected: boolean
}

const Item: React.FC<ItemProps> = ({ label, value, onSelect, selected }) => {
  return (
    <button
      tabIndex={0}
      className={classNames(styles.item, {
        [styles.selected]: selected,
      })}
      onClick={(e) => {
        e.preventDefault();
        onSelect(value);
      }}
    >
      <Text
        bold
        className={styles.itemContent}
        size="body2"
        sm="body1"
      >
        {label}
      </Text>
    </button>
  );
};

export type InlineSelectProps<T> = {
  options: InlineSelectItem<T>[],
  value?: T,
  onChange?: (value: T) => void,
  className?: string;
  style?: CSSProperties;
}

const InlineSelect = <T extends string>({ value, options, onChange, className, ...props }: InlineSelectProps<T>) => {
  return (
    <div className={classNames(styles.itemsWrapper, className)} {...props}>
      {options.map(item => (
        <Item
          {...item}
          key={item.value}
          selected={value === item.value}
          onSelect={onChange}
        />
      ))}
    </div>
  );
};

export default InlineSelect;
