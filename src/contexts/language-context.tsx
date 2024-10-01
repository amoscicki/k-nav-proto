"use client";
import { useAppContext } from "@/contexts/app-context";
import React, { createContext, useContext, useEffect, useState } from "react";

interface LanguageContextType {
  currentLanguage: string;
  setLocale: (lang: string) => void;
  availableLanguages: string[];
  t: (input: TemplateStringsArray | string, ...values: any[]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

type LanguageProviderProps = {
  children: React.ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { getService } = useAppContext();
  const { setOnChangeCallback, t, setLocale, getLocales } = getService(
    "LocalizationService",
  );

  const [currentLanguage, setCurrentLanguage] = useState("");
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  setOnChangeCallback(({ lng }) => {
    setCurrentLanguage(lng);
    document.documentElement.lang = lng;
  });

  useEffect(() => {
    async function init() {
      const locales = await getLocales();
      setAvailableLanguages(locales);
    }
    init();
  }, []);

  function enhancedT(
    input: TemplateStringsArray | string,
    ...values: any[]
  ): string {
    const key =
      typeof input === "string" ? input : String.raw({ raw: input }, ...values);
    return t(key);
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLocale,
        t: enhancedT,
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslations = (prefix?: string) => {
  const context = useContext(LanguageContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  function t(input: TemplateStringsArray | string, ...values: any[]): string {
    const key =
      typeof input === "string" ? input : String.raw({ raw: input }, ...values);
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return context!.t(fullKey);
  }
  return { ...context, t };
};
