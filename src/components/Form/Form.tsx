import React, { useCallback, forwardRef, useState, useImperativeHandle, CSSProperties, useRef } from 'react';
import { FormItem, FormItemProps, FormItemApi } from './FormItem';
import { FormContext } from './FormContext';
import { useUpdateEffect } from 'react-use';
import omit from 'lodash/omit';

export type FormProps<State = Record<string, any>> = {
  initialState?: State
  children: React.ReactNode
  onFinish?: (state: State) => void
  onValuesChange?: (values: State) => void
  className?: string
  style?: CSSProperties
}

export type FormApi<State = Record<string, any>> = {
  setFieldsValue: (update: Partial<State>) => void
  resetFields: () => void
  setFieldError: (field: string, error: string) => void
  getFieldsValue: () => State;
  getFieldValue: (field: string) => unknown
  validateFields: (fields?: string[]) => Promise<void>
  submit: () => Promise<void>
}

// eslint-disable-next-line max-len
export interface CompoundedFormComponent extends React.ForwardRefExoticComponent<FormProps & React.RefAttributes<FormApi>> {
  Item: React.FC<FormItemProps>
  useFormRef: typeof useFormRef;
}

export const Form: CompoundedFormComponent = forwardRef((
  {
    children,
    initialState = {},
    onFinish,
    onValuesChange,
    className,
    style,
  }, ref) => {
  const [fieldsValue, setFieldsValue] = useState(initialState);
  const [refByFieldName, setRefByFieldName] = useState<Record<string, React.RefObject<FormItemApi>>>({});
  const fieldNames = Object.keys(refByFieldName);

  const initField = useCallback((fieldName: string, ref: React.RefObject<FormItemApi>) => {
    setRefByFieldName(obj => ({
      ...obj,
      [fieldName]: ref,
    }));
  }, []);

  const removeField = useCallback((fieldName) => {
    setRefByFieldName(obj => omit(obj, fieldName));
  }, []);

  const updateFieldValue = useCallback((field: string) => (value: any) => {
    setFieldsValue(values => ({
      ...values,
      [field]: value,
    }));
  }, []);

  const updateFieldsValue = useCallback((update: Record<string, unknown>) => {
    setFieldsValue(values => ({
      ...values,
      ...update,
    }));
  }, []);

  useUpdateEffect(() => {
    onValuesChange?.(fieldsValue);
  }, [fieldsValue]);

  const resetFields = useCallback(() => {
    setFieldsValue(initialState);
    fieldNames.map((fieldName) => refByFieldName[fieldName].current.reset());
  }, [fieldNames, initialState, refByFieldName]);

  const setFieldError = useCallback((fieldName: string, error: string) => {
    refByFieldName[fieldName].current.setError(error);
  }, [refByFieldName]);

  const validateFields = useCallback(async (fieldNamesArray = fieldNames) => {
    const promises = fieldNamesArray.map((fieldName) => {
      if (!refByFieldName[fieldName]) {
        throw new Error(`Invalid fieldName ${fieldName}`);
      }
      return refByFieldName[fieldName].current.validate('onFinish');
    });
    const settledPromises = await Promise.allSettled(promises);
    const noErrors = settledPromises.every(promise => promise.status === 'fulfilled');

    if (noErrors) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  }, [fieldNames, refByFieldName]);

  const submit = useCallback(async () => {
    await validateFields();
    onFinish?.(fieldsValue);
  }, [fieldsValue, onFinish, validateFields]);

  const getFieldValue = useCallback((field: string) => {
    return fieldsValue[field];
  }, [fieldsValue]);

  const getFieldsValue = useCallback(() => {
    return fieldsValue;
  }, [fieldsValue]);

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValue: updateFieldsValue,
      resetFields,
      setFieldError,
      validateFields,
      submit,
      getFieldValue,
      getFieldsValue,
    }),
    [updateFieldsValue, resetFields, setFieldError, validateFields, submit, getFieldValue, getFieldsValue]
  );

  const handleSubmit = useCallback(async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit();
  }, [submit]);

  return (
    <FormContext.Provider
      value={{
        fieldsValue,
        initField,
        removeField,
        setFieldsValue,
        updateFieldValue,
        validateFields,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className={className}
        style={style}
        noValidate
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}) as CompoundedFormComponent;

Form.Item = FormItem;

export const useFormRef = <State = Record<string, any>,>() => {
  const formRef = useRef<FormApi<State>>();
  return formRef;
};

Form.useFormRef = useFormRef;

export default Form;
