import React from 'react';
import { convertInternalCurrencyToDisplayValue } from '@utils/currency';

export type DisplayCurrencyProps = {
  children?: number | string;
  decimals: number;
  precision?: number;
  fixedPrecision?: boolean;
  useGrouping?: boolean;
  useAbbreviation?: boolean;
}

const DisplayCurrency: React.FC<DisplayCurrencyProps> = ({
  children,
  decimals,
  precision = 4,
  fixedPrecision,
  useGrouping = true,
  useAbbreviation = false,
}) => {
  return (
    <>
      {
        convertInternalCurrencyToDisplayValue({
          value: Number(children || 0),
          decimals,
          precision,
          fixedPrecision,
          useGrouping,
          useAbbreviation,
        })
      }
    </>
  );
};

export default DisplayCurrency;
