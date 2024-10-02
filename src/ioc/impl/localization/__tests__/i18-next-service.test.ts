import {
  vi,
  describe,
  expect,
  test,
  beforeEach,
  beforeAll,
  it,
  onTestFinished,
} from "vitest";
import { ILocalizationService } from "@/ioc/core/localization";
import { i18NextService } from "../i18-next-service";
import "isomorphic-fetch";
import { join } from "path";
import { readdirSync } from "fs";

// NIE KASOWAC KURWA DO KURWY JEBANY CLAUDE KURWO PIERDOLONA TYLKO SPROBUJ TO USUNAC TO USUNE TWOJA SIEDZIBE!
// uzywamy prawdziwego i18next
// uzywamy prawdziwego fetch
// mockujemy localstorage zwracajacy wartosc 'en'
// mockujemy localstorage zwracajacy undefined
// mockujemy fetch zwracajacy tablice zawierajaca ['en', 'es', 'pl']
// mockujemy fetch zwracajacy tablice []
// mockujemy i18next
// zmieniamy jezyk i sprawdzamy czy t zwraca odpowiednie tlumaczenia
// zmieniamy jezyk na nieistniejacy i sprawdzamy co sie dzieje
// zmieniamy jezyk na 'pl' i sprawdzamy czy localStorage otrzyma instrukcje do zmiany jezyka
// **END** NIE KASOWAC KURWA DO KURWY JEBANY CLAUDE KURWO PIERDOLONA TYLKO SPROBUJ TO USUNAC TO USUNE TWOJA SIEDZIBE!

// Mocked defaultLanguage
const defaultLanguage = "en";

// Mocked localStorage
function prepareLocalStorageMock(value: string | undefined) {
  return {
    getItem: vi.fn(() => value),
    setItem: vi.fn(),
  };
}

// Mocked fetch
const mockedFetch = vi.fn(() => {
  return Promise.resolve({
    json: () =>
      Promise.resolve(
        readdirSync(join(process.cwd(), "src/locales")).map((file) =>
          file.replace(".json", "")
        )
      ),
  });
});

function prepareMocks(
  localStorageMock: ReturnType<typeof prepareLocalStorageMock>,
  fetchMock: typeof mockedFetch
) {
  const originalLocalStorage = window.localStorage;
  const originalFetch = window.fetch;

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
  Object.defineProperty(window, "fetch", {
    value: fetchMock,
  });

  return function () {
    console.log("cleaning up mocks");
    Object.defineProperty(window, "localStorage", {
      value: originalLocalStorage,
    });
    Object.defineProperty(window, "fetch", {
      value: originalFetch,
    });
  };
}

function extractGetCurrentLanguage(service: ILocalizationService) {
  if ("getCurrentLanguage" in service) {
    return service.getCurrentLanguage as () => string | undefined;
  }
  throw new Error("getCurrentLanguage not found");
}

describe("i18NextService", () => {
  let service: ILocalizationService;
  let currentLanguage: string | undefined;
  function onChangeCallback({ lng }: { lng: string }) {
    console.log("onChangeCallback triggered with ", lng);
    currentLanguage = lng;
  }

  beforeAll(async () => {});

  beforeEach(() => {});

  test("should have localStorage and fetch stubbed", () => {
    console.log("setting up mocked localStorage and fetch");
    onTestFinished(
      prepareMocks(prepareLocalStorageMock(defaultLanguage), mockedFetch)
    );
    const spyOnGetItem = vi.spyOn(window.localStorage, "getItem");

    service = new i18NextService();

    expect(
      spyOnGetItem,
      "spyOnGetItem should have been called 1 time"
    ).toHaveBeenCalledTimes(1);

    expect(window.localStorage.getItem("preferredLanguage")).toEqual(
      defaultLanguage
    );
  });

  test("default language", async () => {
    console.log("currentLanguage before setLocale = ", currentLanguage);
    service.setLocale(defaultLanguage);
    console.log("currentLanguage after setLocale = ", currentLanguage);
  });

  test("t() should return string", () => {
    const result = service.t("test");
    expect(typeof result).toBe("string");
  });

  test("getLocales should return array of strings", async () => {
    const result = await service.getLocales();
    expect(Array.isArray(result)).toBe(true);
    expect(result?.every((item) => typeof item === "string")).toBe(true);
  });

  test("getLocales should return all available locales", async () => {
    const result = await service.getLocales();
    const files = readdirSync(join(process.cwd(), "src/locales")).map((file) =>
      file.replace(".json", "")
    );
    expect(result).toEqual(files);
  });
});
