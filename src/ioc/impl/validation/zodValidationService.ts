import { injectable } from "inversify";
import { ZodSchema, z } from "zod";
import {
  IValidationService,
  IValidationRule,
} from "./validationService.interface";

class ZodStringRule implements IValidationRule<string> {
  constructor(private minLength: number = 0) {}

  async validate(value: unknown): Promise<string> {
    return z.string().min(this.minLength).parseAsync(value);
  }
}

class ZodEmailRule implements IValidationRule<string> {
  async validate(value: unknown): Promise<string> {
    return z.string().email().parseAsync(value);
  }
}

class ZodNumberRule implements IValidationRule<number> {
  constructor(private min: number = -Infinity) {}

  async validate(value: unknown): Promise<number> {
    return z.number().min(this.min).parseAsync(value);
  }
}

@injectable()
export class ZodValidationService implements IValidationService {
  createStringRule(minLength: number = 0): IValidationRule<string> {
    return new ZodStringRule(minLength);
  }

  createEmailRule(): IValidationRule<string> {
    return new ZodEmailRule();
  }

  createNumberRule(min: number = -Infinity): IValidationRule<number> {
    return new ZodNumberRule(min);
  }

  async validateField<T>(rule: IValidationRule<T>, value: unknown): Promise<T> {
    return rule.validate(value);
  }

  async validateObject<T>(
    schema: Record<keyof T, IValidationRule<any>>,
    data: unknown,
  ): Promise<T> {
    const result: Partial<T> = {};
    const errors: Record<string, string> = {};

    for (const [key, rule] of Object.entries(schema)) {
      try {
        result[key as keyof T] = await this.validateField(rule, data[key]);
      } catch (error) {
        errors[key] = error.message;
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new Error(JSON.stringify(errors));
    }

    return result as T;
  }
}
