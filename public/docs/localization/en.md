# Translation System Documentation

## Overview

Our project utilizes a robust translation system based on the i18next library, seamlessly integrated with React through custom hooks and contexts. This setup provides a flexible and efficient solution for internationalizing the application, leveraging Inversion of Control (IoC) principles.

## Key Components and Their Locations

1. **ILocalizationService** (`src/lib/services/localization/localization-service.interface.ts`):

   - Defines the interface for the localization service

2. **i18NextService** (`src/lib/services/localization/i18-next-service.ts`):

   - Implements the ILocalizationService interface
   - Initializes i18next
   - Provides methods for translation, language changing, and retrieving available languages

3. **LanguageContext** (`src/contexts/language-context.tsx`):

   - Provides language state and methods throughout the application
   - Exports the useTranslations hook for easy access to translation functions

4. **AppContext** (`src/contexts/app-context.tsx`):

   - Initializes i18NextService using Inversify for dependency injection

5. **LanguageSelector** (`src/components/blocks/language-selector.tsx`):
   - A reusable component for changing the application language

## Implementation Details

### ILocalizationService Interface

```typescript
export interface ILocalizationService {
  t(key: string): string;
  setLocale(locale: string): void;
  getLocales(): string[];
}
```

### i18NextService Implementation

```typescript
@injectable()
export class i18NextService implements ILocalizationService {
  private i18nInstance: typeof i18next;

  constructor() {
    this.i18nInstance = i18next.createInstance({
      lng: "en",
      fallbackLng: "en",
      resources: {
        en: { translation: en },
        pl: { translation: pl },
        es: { translation: es },
      },
      interpolation: { escapeValue: false },
    });
    this.i18nInstance.init();
  }

  t = (key: string): string => {
    return this.i18nInstance.t(key);
  };

  setLocale = (locale: string): void => {
    this.i18nInstance.changeLanguage(locale);
  };

  getLocales = (): string[] => {
    return Object.keys(this.i18nInstance.options.resources || {});
  };
}
```

### Inversion of Control (IoC) Setup

We use Inversify for dependency injection. Here's how it's set up in `src/lib/ioc/container.ts`:

```typescript
import { Container } from "inversify";
import { TYPES } from "./types";
import { ILocalizationService } from "../services/localization/localization-service.interface";
import { i18NextService } from "../services/localization/i18-next-service";

const container = new Container();
container
  .bind<ILocalizationService>(TYPES.LocalizationService)
  .to(i18NextService)
  .inSingletonScope();
```

## Context Implementation

The translation system relies heavily on React Context for state management and providing translation functionality throughout the application. Let's look at the key context implementations:

### LanguageContext (`src/contexts/language-context.tsx`)

This context manages the current language state and provides translation functions.

```typescript
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAppContext } from "@/contexts/app-context";

interface LanguageContextType {
    currentLanguage: string;
    setLocale: (lang: string) => void;
    getLocales: () => string[];
    t: (strings: TemplateStringsArray, ...values: any[]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { loc } = useAppContext();
    const [currentLanguage, setCurrentLanguage] = useState('');

    useEffect(() => {
        const detectLanguage = () => {
            const savedLang = localStorage.getItem('preferredLanguage');
            if (savedLang && loc.getLocales().includes(savedLang)) {
                return savedLang;
            }
            const browserLang = navigator.language.split('-')[0];
            return loc.getLocales().includes(browserLang) ? browserLang : loc.getLocales()[0];
        };

        const detectedLang = detectLanguage();
        setCurrentLanguage(detectedLang);
        loc.setLocale(detectedLang);
    }, [loc]);

    const setLocale = useCallback((lang: string) => {
        setCurrentLanguage(lang);
        loc.setLocale(lang);
        localStorage.setItem('preferredLanguage', lang);
    }, [loc]);

    const t = useCallback((strings: TemplateStringsArray, ...values: any[]) => {
        return loc.t(String.raw({ raw: strings }, ...values));
    }, [loc, currentLanguage]);

    const getLocales = useCallback(() => {
        return loc.getLocales();
    }, [loc]);

    return (
        <LanguageContext.Provider value={{ currentLanguage, setLocale, t, getLocales }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslations = (prefix?: string) => {
    const context = useContext(LanguageContext);
    if (context === undefined)
        throw new Error('useLanguage must be used within a LanguageProvider');

    const { t: baseT } = context;
    const t = (strings: TemplateStringsArray, ...values: any[]): string => {
        const key = String.raw({ raw: strings }, ...values);
        const fullKey = prefix ? `${prefix}.${key}` : key;
        return baseT`${fullKey}`;
    };
    return { ...context, t };
};
```

### AppContext (`src/contexts/app-context.tsx`)

This context initializes the localization service and provides it to the LanguageContext.

```typescript
import React, { createContext, useContext } from 'react';
import { Container } from 'inversify';
import { container } from '@/lib/ioc/container';
import { TYPES } from '@/lib/ioc/types';
import type { ILocalizationService } from '@/lib/services/localization/localization-service.interface';
import { LanguageProvider } from  './language-context';

interface AppContextType {
    container: Container;
    loc: ILocalizationService;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const loc = container.get<ILocalizationService>(TYPES.LocalizationService);

    return (
        <AppContext.Provider value={{ container, loc }}>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
```

## Using the Contexts

To use the translation functionality in your components:

1. Ensure your component is wrapped with the AppProvider (usually done in the root component).

2. Use the `useTranslations` hook to access translation functions:

```typescript
import { useTranslations } from '@/contexts/language-context';

function YourComponent() {
    const { t, setLocale, getLocales, currentLanguage } = useTranslations('YourNamespace');

    return (
        <div>
            <h1>{t`title`}</h1>
            <p>{t`description`}</p>
            <button onClick={() => setLocale('es')}>Switch to Spanish</button>
        </div>
    );
}
```

The contexts work together to provide a seamless translation experience:

- AppContext initializes the localization service.
- LanguageContext manages the current language and provides translation functions.
- Components can easily access and use these functions through the `useTranslations` hook.

This setup allows us to easily swap the implementation of ILocalizationService if needed, without changing the consuming code.

## How to Use

1. Import the useTranslations hook:

   ```typescript
   import { useTranslations } from "@/contexts/language-context";
   ```

2. Use the hook in your component:

   ```typescript
   const { t, setLocale, getLocales, currentLanguage } =
     useTranslations("NamespaceName");
   ```

3. Translate text:

   ```typescript
   const translatedText = t`keyName`;
   ```

4. Change language:

   ```typescript
   setLocale("en");
   ```

5. Get available languages:
   ```typescript
   const availableLanguages = getLocales();
   ```

## Using the LanguageSelector Component

To add language selection functionality to your component or page, you can use the pre-built LanguageSelector component:

```typescript
import { LanguageSelector } from "@/components/blocks/language-selector";

function YourComponent() {
    return (
        <div>
            <LanguageSelector />
            {/* Rest of your component */}
        </div>
    );
}
```
