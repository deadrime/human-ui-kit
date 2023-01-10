export type RuleType = 'string' | 'number' | 'regexp' | 'email';

export type Validator = (value: any, rule: FormItemRule) => Promise<void | any>;

export type ValidateTrigger = 'onChange' | 'onFinish'

export type FormItemRule = {
  required?: boolean,
  validateTrigger?: ValidateTrigger[],
  min?: number,
  max?: number;
  len?: number;
  pattern?: RegExp;
  message?: string;
  type?: RuleType // ?
  validator?: Validator,
}

export type ValidationStatus = 'notStarted' | 'validating' | 'success' | 'error'
