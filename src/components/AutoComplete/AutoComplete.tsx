import React, { useCallback, useEffect, useState, memo } from 'react';
import { useDebounce } from 'react-use';
import Text from '@components/Text';
import { ValidationStatus } from '@components/Form/types';
import { InputWrapperProps } from '@components/input/types';
import Select, { SelectOption, SelectProps } from '@components/Select/Select';

export type AutocompleteProps = {
  getSuggestions: (query: string) => SelectOption<string>[] | Promise<SelectOption<string>[]>,
  value?: string,
  onChange?: (value: string) => void
  preselectedOption?: SelectOption<string>,
  placeholder?: SelectProps<string>['placeholder'],
  mode?: 'suggestions' | 'select'
  inputWrapperProps?: Omit<InputWrapperProps, 'component'>
  validationStatus?: ValidationStatus
  hasFeedback?: boolean
}

const AutoComplete = ({
  getSuggestions,
  value,
  onChange,
  preselectedOption,
  placeholder = 'Select',
  mode = 'select',
  inputWrapperProps,
  validationStatus,
  hasFeedback,
}: AutocompleteProps) => {
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const loadSuggestions = useCallback(async (query) => {
    setLoading(true);
    const newOptions = await getSuggestions?.(query);
    setLoading(false);
    setOptions(newOptions);
  }, [getSuggestions]);

  useDebounce(() => {
    loadSuggestions(query);
  }, 200, [query]);

  useEffect(() => {
    if (mode === 'suggestions') {
      loadSuggestions(query);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const handleChange = useCallback((value: string) => {
    onChange?.(value);
    if (mode === 'suggestions') {
      setQuery(value);
    }
  }, [onChange, mode]);

  const handleSearch = useCallback((query: string) => {
    if (query) {
      setLoading(true);
    }
    setQuery(query);
  }, []);

  return (
    <Select
      mode={mode === 'suggestions' ? 'suggestions' : 'search'}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      preselectedOption={preselectedOption}
      options={options}
      focusOnOpen={false}
      searchQuery={query}
      onSearch={handleSearch}
      showToggleIcon={false}
      loading={loading}
      style={{ width: '100%' }}
      inputWrapperProps={{
        ...inputWrapperProps,
        validationStatus,
        hasFeedback,
      }}
      emptyState={!loading && query.length > 0 && mode !== 'suggestions' &&
        <Text block style={{ padding: '8px 12px' }}>
          👀 Nothing found
        </Text>
      }
    />
  );
};

export default memo(AutoComplete);
