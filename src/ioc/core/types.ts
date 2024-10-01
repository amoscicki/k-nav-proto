import { IMarkdownService } from "@/ioc/core/markdown";
import { ILoggerService } from "@/ioc/core/logger";
import { ILocalizationService } from "@/ioc/core/localization";
import { interfaces } from "inversify";
import { IAuthService } from "@/ioc/core/auth";
import { IFormService } from "@/ioc/core/form-control";
import { IValidationService } from "@/ioc/core/validation";
import { IDatabaseService } from "@/ioc/core/database";

export const TYPES = {
  DatabaseService: {
    s: Symbol.for("DatabaseService"),
    type: {} as IDatabaseService,
  },
  AuthService: {
    s: Symbol.for("AuthService"),
    type: {} as IAuthService,
  },
  MarkdownService: {
    s: Symbol.for("MarkdownService"),
    type: {} as IMarkdownService,
  },
  LoggerService: {
    s: Symbol.for("LoggerService"),
    type: {} as ILoggerService,
  },
  LocalizationService: {
    s: Symbol.for("LocalizationService"),
    type: {} as ILocalizationService,
  },
  ValidationService: {
    s: Symbol.for("ValidationService"),
    type: {} as IValidationService,
  },
  FormService: {
    s: Symbol.for("FormService"),
    type: {} as IFormService<any>,
  },
} as const;

export type ServiceConfig<
  T extends keyof typeof TYPES,
  type = (typeof TYPES)[T]["type"],
> = {
  _type?: type;
  impl: interfaces.Newable<type>;
  scope: interfaces.BindingScope;
};
