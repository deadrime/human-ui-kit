import { Meta } from '@storybook/react';
import DisplayCurrency from './DisplayCurrency';
import { formatCurrency, formatNumber, FormatNumberProps, formatPercent } from '@utils/numberFormatters';

export default {
  component: DisplayCurrency,
} as Meta<typeof DisplayCurrency>;

export const FormatNumber = {
  render: (args) => formatNumber(args.number, args),
  args: {
    number: 99,
    decimals: 0,
    minimumFractionDigits: 4,
    maximumFractionDigits: 6,
  } as FormatNumberProps & { number: number },
};

export const FormatCurrency = {
  render: (args) => formatCurrency(args.number, args),
  args: {
    number: 99,
    decimals: 0,
    currency: 'USD',
    approximate: true,
  } as FormatNumberProps & { number: number },
};

export const FormatPercentage = {
  render: (args) => formatPercent(args.number, args),
  args: {
    number: 99,
    decimals: 0,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  } as FormatNumberProps & { number: number },
};
