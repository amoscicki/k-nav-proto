export interface IFormField<T = any> {
  value: T;
  onChange: (value: T) => void;
  onBlur: () => void;
  error?: string;
}

export interface IFormActions {
  submit: () => void;
  reset: () => void;
}

export interface IFormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface IFormService<T> {
  initialize: (initialValues: Partial<T>) => void;
  registerField: <K extends keyof T>(name: K) => IFormField<T[K]>;
  setFieldValue: <K extends keyof T>(name: K, value: T[K]) => void;
  getFieldValue: <K extends keyof T>(name: K) => T[K];
  setFieldError: <K extends keyof T>(name: K, error: string) => void;
  getFieldError: <K extends keyof T>(name: K) => string | undefined;
  validate: () => Promise<boolean>;
  handleSubmit: (
    onSubmit: (values: T) => Promise<void>,
  ) => (e?: React.FormEvent) => Promise<void>;
  getFormState: () => IFormState<T>;
  getFormActions: () => IFormActions;
}
