import React, { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { convertDisplayValueToInternalCurrency, convertInternalCurrencyToDisplayValue, parseLocaleNumber, truncateFractionalPart } from '@utils/currency';
import { useForwardRef } from '@hooks/useForwardRef';
import { InputProps } from './types';

export interface CurrencyInputProps extends InputProps<number> {
  decimals: number;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(({
  onChange,
  onPaste,
  value,
  disabled,
  placeholder,
  focused,
  readOnly,
  decimals,
  onFocus,
  onBlur,
}, ref) => {
  const [inputValue, setInputValue] = useState<string>();

  useEffect(() => {
    // As long as the input is not focused...
    if (!focused) {
      const displayValue = convertInternalCurrencyToDisplayValue({
        value,
        decimals,
        precision: decimals,
      });
      // ... update it to match the external value
      setInputValue(displayValue);
    }
  }, [value, focused, decimals]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    // Ensure user can't put more numbers into the fractional part than `decimals` prop allows
    value = truncateFractionalPart(value, decimals);

    setInputValue(value);

    // Treat empty input as 0
    if (!value) {
      onChange(0);
      return;
    }

    // Don't update the external value until we have a valid number on our hands
    const parsedValue = parseLocaleNumber(value);
    if (isNaN(parsedValue)) {
      return;
    }

    // Treat negative numbers as 0
    if (parsedValue < 0) {
      onChange(0);
      return;
    }

    // Converting the value displayed to internal currency
    const currencyValue = convertDisplayValueToInternalCurrency(
      parsedValue,
      decimals
    );

    onChange && onChange(currencyValue);
  };

  const inputRef = useForwardRef(ref);

  useEffect(() => {
    const inputElement = inputRef.current;

    function wheelHandler(e: WheelEvent) {
      // Disable wheel scrolling when inside an input currency
      if (document.activeElement === e.target) {
        e.preventDefault();
      }
    }

    if (inputElement) {
      inputElement.addEventListener('wheel', wheelHandler);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('wheel', wheelHandler);
      }
    };
  }, [inputRef]);

  return (
    <input
      lang="en-US"
      ref={inputRef}
      onPaste={onPaste}
      className="input"
      type="number"
      readOnly={readOnly}
      placeholder={placeholder}
      value={inputValue ?? ''}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      autoComplete="off"
      onKeyDown={(e) => {
        // Prevent typing in minus character
        if (e.key === '-') {
          e.preventDefault();
        }
      }}
      disabled={disabled}
    />
  );
});
