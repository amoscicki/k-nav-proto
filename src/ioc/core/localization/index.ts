import "reflect-metadata";
import { injectable } from "inversify";

export interface ILocalizationService {
  t(key: string): string;
  setLocale(locale: string): void;
  getLocales(): string[] | Promise<string[]>;
  setOnChangeCallback(cb: ({ lng }: { lng: string }) => void): void;
}

@injectable()
export class defaultLocalizationService implements ILocalizationService {
  t(key: string) {
    return key;
  }
  setLocale(locale: string) {
    return;
  }
  getLocales = async () => {
    return [];
  };
  setOnChangeCallback = (cb: ({ lng }: { lng: string }) => void) => {};
}
