import { AppConfig } from "@/ioc/core";
import { i18NextService } from "@/ioc/impl/localization/i18-next-service";
import { kozakLogger } from "@/ioc/impl/logger/kozak-logger";

export const clientConfig: AppConfig = {
  // Logger
  LoggerService: {
    impl: kozakLogger,
    scope: "Singleton",
  },
  // Localization
  LocalizationService: {
    impl: i18NextService,
    scope: "Singleton",
  },
} as const;

export const serverConfig: AppConfig = {};
