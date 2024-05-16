import React, { CSSProperties, useCallback, useContext, useImperativeHandle, useMemo, useRef, useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import Text from '@components/Text';
import { checkPattern, checkMax, checkMin, checkRequired } from './basicValidation';
import { FormContext } from './FormContext';
import { FormItemRule, Validator, ValidationStatus, ValidateTrigger } from './types';
import styles from './FormItem.module.less';
import classNames from 'classnames';
import omit from 'lodash/omit';

const emailRegex =
  /* eslint-disable-next-line no-useless-escape */
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type ValidationError = {
  ruleKey: string | number;
  errorText: string;
}

type FormItemChildrenProps = {
  value: any,
  onChange: (value: any) => void
  validationStatus?: ValidationStatus
  hasFeedback?: boolean
}

export type FormItemApi = {
  validate: (trigger?: ValidateTrigger) => Promise<void>;
  reset: () => void;
  setError: (error: string) => void
}

export type FormItemProps = {
  children: React.ReactElement
  label?: React.ReactNode
  name: string
  rules?: FormItemRule[]
  className?: string,
  style?: CSSProperties,
  hasFeedback?: boolean
  getValueFromEvent?: (value: any) => any
  onInvalid?: (error: string, value: any, rule: FormItemRule) => void
}


// TODO: add validation error with JSX support
export const FormItem: React.FC<FormItemProps> = ((
  {
    children,
    name,
    rules = [],
    label,
    className,
    style,
    hasFeedback,
    getValueFromEvent = (value) => value,
    onInvalid,
  }) => {
  const { value, setValue, ref } = useField(name);
  const [errorByRuleKey, setErrorByRuleKey] = useState<Record<string, string>>({});
  const stateRef = useRef<{ valueChanged: boolean }>({ valueChanged: false });
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>('notStarted');

  const rulesWithKey = useMemo(() => rules.map((rule, index) => ({
    ...rule,
    key: index,
    validateTrigger: rule.validateTrigger || ['onChange', 'onFinish'],
  })), [rules]);

  const executeValidator = useCallback(
    async (
      value: unknown,
      validator: Validator,
      rule: FormItemRule & { key: number }
    ) => {
      try {
        await validator(value, rule);
        return Promise.resolve(rule.key);
      } catch (error) {
        const errorText = rule.message || String(error);
        onInvalid?.(rule.message || String(error), value, rule);
        return Promise.reject({
          ruleKey: rule.key,
          errorText,
        }) as Promise<ValidationError>;
      }
    }, [onInvalid]);

  const runValidators = useCallback(async (value: unknown, trigger?: ValidateTrigger) => {
    if (!rulesWithKey.length) {
      return;
    }
    const promises = [];

    for (let rule of rulesWithKey) {
      if (!rule.validateTrigger.includes(trigger)) {
        // Just to reset error
        promises.push(Promise.resolve(rule.key));
        continue;
      }
      if (rule.required) {
        promises.push(executeValidator(value, checkRequired, rule));
      }
      if (rule.min) {
        promises.push(executeValidator(value, checkMin, rule));
      }
      if (rule.max) {
        promises.push(executeValidator(value, checkMax, rule));
      }
      if (rule.validator) {
        promises.push(executeValidator(value, rule.validator, rule)) ;
      }
      if (rule.pattern) {
        promises.push(executeValidator(value, checkPattern, rule));
      }
      if (rule.type === 'email') {
        promises.push(executeValidator(value, checkPattern, {
          ...rule,
          pattern: emailRegex,
        }));
      }
    }

    const settledPromises = await Promise.allSettled(promises);
    const noErrors = settledPromises.every(promise => promise.status === 'fulfilled');

    setErrorByRuleKey(obj => {
      const errorByRuleKeyUpdate = settledPromises.reduce((acc, promise) => {
        if (promise.status === 'fulfilled') {
          return omit(acc, promise.value);
        } else if (promise.status === 'rejected') {
          const { ruleKey, errorText } = promise.reason as ValidationError;
          return {
            ...acc,
            [ruleKey]: errorText,
          };
        }
      }, obj);
      return errorByRuleKeyUpdate;
    });

    if (!noErrors) {
      return Promise.reject('reject');
    }
  }, [executeValidator, rulesWithKey]);

  const validate = useCallback(async (trigger?: ValidateTrigger) => {
    setValidationStatus('validating');
    try {
      await runValidators(value, trigger);
      setValidationStatus('success');
    } catch (error) {
      setValidationStatus('error');
      return Promise.reject();
    }
  }, [runValidators, value]);

  useDebounce(() => {
    if (!stateRef?.current.valueChanged) {
      return;
    }
    validate('onChange');
  }, 300, [validate]);

  const setError = useCallback((error: string) => {
    setErrorByRuleKey(obj => ({
      ...obj,
      customError: error,
    }));
  }, []);

  const reset = useCallback(() => {
    stateRef.current.valueChanged = false;
    setValidationStatus('notStarted');
    setErrorByRuleKey({});
  }, []);

  useImperativeHandle(ref, () => ({
    validate,
    reset,
    setError,
  }), [reset, setError, validate]);

  const handleChange = useCallback(async (value) => {
    stateRef.current.valueChanged = true;

    // Reset custom error
    if (errorByRuleKey['customError']) {
      setErrorByRuleKey(obj => omit(obj, 'customError'));
    }
    // TODO: For another triggers we need to add some logic here
    setValue(getValueFromEvent(value));
  }, [getValueFromEvent, errorByRuleKey, setValue]);

  return (
    <div className={classNames(styles.wrapper, className)} style={style}>
      {label && <Text
        size="body2"
        bold
        block
        style={{ marginBottom: 8 }}
      >
        {label}
      </Text>}
      {React.cloneElement(children as React.ReactElement<FormItemChildrenProps>, {
        value,
        onChange: value => {
          handleChange(value);
          children.props?.onChange?.(value);
        },
        validationStatus,
        hasFeedback,
      })}
      {Object.values(errorByRuleKey).map((error, index) => (
        <Text
          key={index}
          size="body2"
          color="red"
          className={styles.error}
        >
          {error}
        </Text>
      ))}
    </div>
  );
});

const useField = (field: string) => {
  const { updateFieldValue, fieldsValue, initField, removeField } = useContext(FormContext);
  const ref = useRef<FormItemApi>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    initField(field, ref);
    return () => {
      removeField(field);
    };
  }, [ref, field, initField, removeField]);

  const value = typeof fieldsValue[field] !== 'undefined' ? fieldsValue[field] : '';

  return {
    ref,
    value,
    setValue: updateFieldValue(field),
  };
};

FormItem.displayName = 'FormItem';
