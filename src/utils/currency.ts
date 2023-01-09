export function createNumberFormatter({
  useGrouping,
  maximumFractionDigits,
  minimumFractionDigits,
}) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    minimumFractionDigits,
    useGrouping,
  });
}

export const INPUT_CURRENCY_FORMATTER = createNumberFormatter({
  maximumFractionDigits: 20,
  useGrouping: false,
  minimumFractionDigits: 2,
});

export const DECIMAL_SEPARATOR = INPUT_CURRENCY_FORMATTER.format(1.1).replace(
  /\d/g,
  ''
);

export function truncateFractionalPart(numericString, decimals) {
  if (typeof numericString !== 'string') {
    return numericString;
  }

  const decimalSeparatorIndex = numericString.indexOf(DECIMAL_SEPARATOR);
  if (decimalSeparatorIndex < 0) {
    return numericString;
  }

  return numericString.substring(0, decimalSeparatorIndex + decimals + 1);
}

/**
 * Parse a localized number to a float.
 * @param {string} numberString - the localized number
 */
export function parseLocaleNumber(numberString) {
  const normalizedNumberString = numberString.replace(
    new RegExp('\\' + DECIMAL_SEPARATOR),
    '.'
  );
  return parseFloat(normalizedNumberString);
}

export const convertInternalCurrencyToDisplayValue = ({
  value,
  decimals,
  precision,
  fixedPrecision = false,
  useGrouping = false,
}) => {
  if (value == null) return value;
  if (typeof value === 'string') {
    value = Number(value);
  }

  let convertedValue = value / Math.pow(10, decimals);
  const result =
    precision == null
      ? convertedValue
      : flexibleToFixed(convertedValue, precision);

  const currencyFormatter = createNumberFormatter({
    useGrouping: useGrouping ?? false,
    maximumFractionDigits: fixedPrecision ? precision : 20,
    minimumFractionDigits: fixedPrecision ? precision : 2,
  });

  return currencyFormatter.format(result);
};

export const convertDisplayValueToInternalCurrency = (value, decimals) => {
  if (value === undefined) return undefined;
  if (typeof value === 'string') {
    value = parseLocaleNumber(value);
  }

  return Math.round(value * Math.pow(10, decimals));
};

export const flexibleToFixed = (floatValue, decimals = 4) => {
  const result =
    Math.round((floatValue + Number.EPSILON) * Math.pow(10, decimals)) /
    Math.pow(10, decimals);
  return result;
};
