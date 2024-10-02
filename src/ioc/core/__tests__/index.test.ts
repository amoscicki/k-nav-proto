import "reflect-metadata";
import { AppConfig, bindConfig } from "../index";
import { TYPES } from "../types";
import { defaultLoggerService } from "../logger";
import { defaultLocalizationService } from "../localization";
import { describe, expect, it } from "vitest";

const testConfig: AppConfig = {
  LoggerService: {
    impl: defaultLoggerService,
    scope: "Singleton",
  },
  LocalizationService: {
    impl: defaultLocalizationService,
    scope: "Singleton",
  },
};

const getService = bindConfig(testConfig);

describe("IoC Container", () => {
  it("should retrieve LoggerService", () => {
    const loggerService = getService("LoggerService");
    expect(loggerService).toBeDefined();
    expect(typeof loggerService.log).toBe("function");
  });

  it("should retrieve LocalizationService", () => {
    const localizationService = getService("LocalizationService");
    expect(localizationService).toBeDefined();
    expect(typeof localizationService.t).toBe("function");
  });

  it("should throw error when service is not registered", () => {
    expect(() => getService("NonExistentService" as any)).toThrow(
      "Service NonExistentService is not bound to the container"
    );
  });

  it("should return the same instance for singleton services", () => {
    const logger1 = getService("LoggerService");
    const logger2 = getService("LoggerService");
    expect(logger1).toBe(logger2);
  });

  it("should bind all services from appConfig", () => {
    Object.keys(testConfig).forEach((key) => {
      expect(() => getService(key as keyof typeof TYPES)).not.toThrow();
    });
  });
});
