import { createContext } from 'react';
import { FormItemApi } from './FormItem';

export type FormContextState<State = Record<string, any>> = {
  fieldsValue: Record<string, any>
  updateFieldValue: (field: string) => (value: any) => void
  setFieldsValue: (update: Partial<State>) => void
  initField: (fieldName: string, ref: React.RefObject<FormItemApi>) => void
  removeField: (fieldName: string) => void
}

const formDefaultContect: FormContextState = {
  fieldsValue: {},
  initField: () => {},
  updateFieldValue: () => () => {},
  setFieldsValue: () => {},
  removeField: () => {},
};

export const FormContext = createContext<FormContextState>(formDefaultContect);
