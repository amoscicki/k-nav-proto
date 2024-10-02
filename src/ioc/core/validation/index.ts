export interface IValidationRule<T> {
  validate(value: unknown): Promise<T>;
}

export interface IValidationService {
  createStringRule(minLength?: number): IValidationRule<string>;
  createEmailRule(): IValidationRule<string>;
  createNumberRule(min?: number): IValidationRule<number>;
  validateField<T>(rule: IValidationRule<T>, value: unknown): Promise<T>;
  validateObject<T>(
    schema: Record<keyof T, IValidationRule<any>>,
    data: unknown,
  ): Promise<T>;
}
