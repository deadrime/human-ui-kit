import React, { forwardRef } from 'react';
import { DisplayCurrency } from '@components/DisplayCurrency';
import { Text, TextProps } from '@components/Text';
import { CurrencyInput, CurrencyInputProps } from './CurrencyInput';
import { InputWrapper } from './InputWrapper';
import { CoreInputWrapperProps } from './types';
import styles from './CurrencyInputWrapper.module.less';

export type CurrencyInputWrapperProps = CoreInputWrapperProps<number, CurrencyInputProps>;

export const CurrencyInputWrapper = forwardRef<HTMLInputElement, CurrencyInputWrapperProps>((props, ref) => {
  return <InputWrapper component={CurrencyInput} ref={ref} {...props} />;
});

interface CurrencyInputWrapperWithBalanceAndUsdEstimateProps extends Omit<CurrencyInputWrapperProps, 'hint'> {
  balanceAmount?: string|number;
  centsPerChatlan?: string|number;
  balanceLabelProps?: Omit<TextProps, 'ref'>;
  tokenName: string;
}

export const CurrencyInputWrapperWithBalanceAndUsdEstimate =
  forwardRef<HTMLInputElement, CurrencyInputWrapperWithBalanceAndUsdEstimateProps>(
    (props, ref) => {
      const centsForAmount = Number(props.centsPerChatlan) * props.value;

      return (
        <CurrencyInputWrapper
          {...props}
          decimals={props.decimals}
          ref={ref}
          hint={
            !!props.balanceAmount && <div className={styles.balanceAndUsdEstimate}>
              <span>
                <Text size="body2" color="gray-200" {...props.balanceLabelProps} />
                {' '}
                <Text size="body2" color="gray-200">
                  <DisplayCurrency decimals={props.decimals}>
                    {props.balanceAmount}
                  </DisplayCurrency> {props.tokenName}
                </Text>
              </span>
              {!isNaN(centsForAmount) && <Text size="body2" color="gray-200">
                ~ $<DisplayCurrency decimals={props.decimals + 2} precision={2}>
                  {centsForAmount}
                </DisplayCurrency>
              </Text>}
            </div>
          }
        />
      );
    });
