import { ILocalizationService } from "@/ioc/core/localization";
import { injectable } from "inversify";
import "reflect-metadata";

import i18next from "i18next";
import HttpBackend, { HttpBackendOptions } from "i18next-http-backend";

@injectable()
export class i18NextService implements ILocalizationService {
  private i18nInstance: typeof i18next;
  private onChangeCallback: ({ lng }: { lng: string }) => void = () => {};

  constructor() {
    const preferredLanguage = localStorage.getItem("preferredLanguage");
    this.i18nInstance = i18next.createInstance({
      interpolation: { escapeValue: false },
      ...(preferredLanguage && { lng: preferredLanguage }),
    });
    this.i18nInstance.use(HttpBackend).init<HttpBackendOptions>({
      backend: {
        loadPath: "/api/v1/locale?lng={{lng}}",
      },
    });
    this.i18nInstance.on("languageChanged", (lng) => {
      this.onChangeCallback({ lng });
    });
  }

  getAvailableLocales = async () => {
    const locales = await fetch("/api/v1/locale");
    const data = (await locales.json()) as string[];
    return data;
  };

  t = (key: string): string => {
    return this.i18nInstance.resolvedLanguage ? this.i18nInstance.t(key) : "";
  };

  setLocale = (locale: string): void => {
    this.i18nInstance.changeLanguage(locale);
    localStorage.setItem("preferredLanguage", locale);
  };

  getLocales = async () => {
    return await this.getAvailableLocales();
  };

  setOnChangeCallback = (cb: ({ lng }: { lng: string }) => void) => {
    this.onChangeCallback = cb;
  };
}
