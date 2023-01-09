import React, { CSSProperties, useCallback, useState, useMemo } from 'react';
import { InputWrapper } from '@components/input/InputWrapper';
import { TextInput } from '@components/input/TextInput';
import Tag from '@components/Tag/Tag';
import Tags from '@components/Tag/Tags';
import { Dropdown } from '@components/Dropdown/Dropdown';
import styles from './Select.module.less';
import { Menu } from '@components/Menu/Menu';
import Text from '@components/typography';
import IconApprove from '@icons/approve.svg';
import IconArrowUp from '@icons/arrow-up.svg';
import IconLoading from '@icons/loading.svg';
import { useDeepCompareMemo } from '@hooks/useDeepCompareMemo';
import classNames from 'classnames';
import { InputWrapperProps } from '../input/types';

export type SelectOption<T> = {
  value: T,
  label?: string | React.ReactElement
}

export type SelectProps<T> = {
  value?: T,
  onChange?: (value: T) => void,
  mode?: 'single' | 'multiple' | 'search' | 'suggestions',
  searchable?: boolean,
  style?: CSSProperties,
  preselectedOption?: SelectOption<T>,
  options: SelectOption<T>[],
  placeholder?: string
  focusOnOpen?: boolean
  showToggleIcon?: boolean
  searchQuery?: string
  onSearch?: (value: string) => void
  loading?: boolean
  emptyState?: React.ReactNode
  className?: string
  inputWrapperProps?: Omit<InputWrapperProps, 'component'>
}

const Select = <T extends unknown | unknown[]>({
  value,
  style,
  mode = 'single',
  onChange,
  placeholder = 'Select',
  preselectedOption,
  options: userOptions = [],
  focusOnOpen,
  showToggleIcon = true,
  searchQuery,
  onSearch,
  loading,
  emptyState,
  className,
  inputWrapperProps,
}: React.PropsWithoutRef<SelectProps<T>>): React.ReactElement => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selected = useMemo<unknown[]>(() => Array.isArray(value)
    ? value
    : value ? [value] : []
  , [value]);

  const options: SelectOption<T>[] = userOptions
    .map(option => typeof option === 'object'
      ? option
      : { value: option, label: option }
    );

  const optionsMap = useDeepCompareMemo(
    () =>
      options.reduce<Record<string, SelectOption<T>>>((acc, curr) => {
        acc[String(curr.value)] = curr;
        return acc;
      },
      preselectedOption ? {
        [String(preselectedOption?.value)]: preselectedOption,
      } : {}),
    [options, preselectedOption]
  );

  const handleChange = useCallback((value: boolean) => {
    if (loading) {
      return;
    }
    setDropdownOpen(value);
  }, [loading]);

  const handleDelete = useCallback((value: T) => {
    if (mode === 'multiple') {
      onChange?.(selected.filter(item => item !== value) as T);
    } else if (mode === 'single') {
      onChange(undefined);
    }
  }, [mode, selected, onChange]);

  const handleSelect = useCallback((newValue: T) => {
    if (mode === 'suggestions') {
      onChange?.(newValue as T);
      setDropdownOpen(false);
    } else if (!Array.isArray(value)) {
      onChange?.(newValue);
      setDropdownOpen(false);
    } else {
      if (selected.includes(newValue)) {
        handleDelete(newValue);
        return;
      }
      onChange?.([...value, newValue] as T);
    }
  }, [mode, value, onChange, selected, handleDelete]);

  const handleDeleteSelected = useCallback(() => {
    onChange(undefined);
    onSearch('');
  }, [onChange, onSearch]);

  const bodyByMode = useDeepCompareMemo(() => ({
    suggestions: TextInput,
    search: !value ? TextInput : () => (
      <Tag
        className={styles.searchModeTag}
        key={String(value)}
        closable={!loading}
        onClose={handleDeleteSelected}
      >
        <span className={styles.tagLabel}>
          {optionsMap[String(value)]?.label || String(optionsMap[String(value)]?.value)}
        </span>
      </Tag>
    ),
    single: () => (
      <Text className={styles.placeholder}>
        {value ? optionsMap[String(value)]?.label : placeholder}
      </Text>
    ),
    multiple: () => (
      <Tags className={styles.tagsWrapper}>
        {selected.length === 0 && (
          <Text className={styles.placeholder}>
            {placeholder}
          </Text>
        )}
        <>
          {selected.map(item => optionsMap[String(item)]).map(item => (
            <Tag
              key={String(item.value)}
              closable
              onClose={() => handleDelete(item.value as T)}
            >
              <span className={styles.tagLabel}>
                {item.label}
              </span>
            </Tag>
          ))}
        </>
      </Tags>
    ),
  }), [loading, placeholder, selected, value]);

  const dropdownOverlay = useDeepCompareMemo(() => (
    <>
      {!loading && !options.length && emptyState}
      {options.length > 0 && <Menu className={styles.menu}>
        {options.map(option => (
          <Menu.Item
            className={styles.menuItem}
            key={String(option.value)}
            onClick={(_, event) => {
              event.preventDefault();
              event.stopPropagation();
              handleSelect(option.value);
            }}
          >
            <div className={styles.menuItemContent}>
              <span className={styles.optionLabel}>{option.label || String(option.value)}</span>
              {selected.includes(option.value) && <IconApprove width={14} className={styles.menuItemIcon} />}
            </div>
          </Menu.Item>
        ))}
      </Menu>}
    </>
  ), [emptyState, handleSelect, loading, options, selected]);

  return (
    <Dropdown
      open={dropdownOpen}
      onChange={handleChange}
      className={classNames(styles.dropdown, className)}
      overlay={dropdownOverlay}
      overlayClassName={styles.overlay}
      summaryClassName={styles.summary}
      focusOnOpen={focusOnOpen}
      style={style}
    >
      <InputWrapper
        className={styles.input}
        outlined
        onChange={(value: string) => {
          if (mode === 'search') {
            setDropdownOpen(!!value);
            onSearch?.(value);
          }
          if (mode === 'suggestions') {
            setDropdownOpen(!!value);
            onChange?.(value as T);
          }
        }}
        value={mode === 'suggestions' ? value : searchQuery}
        placeholder={placeholder}
        suffix={
          loading ? <IconLoading width={20} /> :
          showToggleIcon && <IconArrowUp width={20} style={{ transform: dropdownOpen ? undefined : 'rotate(180deg)' }} />
        }
        component={bodyByMode[mode]}
        {...inputWrapperProps}
      />
    </Dropdown>
  );
};

export default Select;
