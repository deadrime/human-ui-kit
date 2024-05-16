export type FormatNumberProps = Intl.NumberFormatOptions & {
  fallback?: string | number;
  decimals?: number;
  useAbbreviation?: boolean;
  approximate?: boolean;
}

const defaultMaximumFractionDigits = 2;

export const formatNumber = (
  number: number,
  {
    decimals = 0,
    minimumFractionDigits = 0,
    fallback = 0,
    notation = 'standard',
    unit,
    currency,
    approximate = false,
    ...props
  }: FormatNumberProps = {}
) => {
  if ((!['number', 'string'].includes(typeof number)) || number === Infinity || Number.isNaN(number)) {
    return String(fallback);
  }

  // For now we support only USD and tickets
  const style = currency === 'USD' ? props.style || 'currency' : props.style;

  const maximumFractionDigits = Math.max(props.maximumFractionDigits || defaultMaximumFractionDigits, minimumFractionDigits);
  const isNegative = number < 0;

  const minimumNumberToDisplay = number === 0 ? 0 : 1 / (10 ** Math.min(maximumFractionDigits, 6));

  const isTooSmall = Math.abs(number) / (10 ** decimals) < Math.abs(minimumNumberToDisplay);

  const formatted = new Intl.NumberFormat('en-US', {
    ...props,
    minimumFractionDigits: notation === 'compact' ? 0 : minimumFractionDigits,
    maximumFractionDigits,
    notation,
    currency: currency === 'USD' ? currency : undefined,
    unit,
    style,
  }).format(
    Math.max(Math.abs(number) / 10 ** decimals, minimumNumberToDisplay)
    * (isNegative ? -1 : 1)
  );

  return `${approximate || isTooSmall ? '~ ' : ''}${formatted}${currency && currency !== 'USD' ? ` ${currency}` : ''}`;
};

export const formatPercent = (percentage: number, options: FormatNumberProps = {}) => {
  return formatNumber(percentage, {
    style: 'unit',
    unit: 'percent',
    ...options,
  });
};

export const formatCurrency = (amount: number, options: FormatNumberProps = {}) => {
  return formatNumber(amount, {
    currency: 'USD', // By default
    minimumFractionDigits: 2,
    ...options,
  });
};

export const largeNumberToString = (percentage: number, options: FormatNumberProps = {}) => {
  return formatNumber(percentage, {
    notation: 'compact',
    ...options,
  });
};
