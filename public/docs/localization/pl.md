# Dokumentacja systemu tłumaczeń

## Przegląd

Nasz projekt wykorzystuje solidny system tłumaczeń oparty na bibliotece i18next, płynnie zintegrowany z React za pomocą niestandardowych hooków i kontekstów. To rozwiązanie zapewnia elastyczną i wydajną metodę internacjonalizacji aplikacji, wykorzystując zasady Inwersji Kontroli (IoC).

## Kluczowe komponenty i ich lokalizacje

1. **ILocalizationService** (`src/lib/services/localization/localization-service.interface.ts`):

   - Definiuje interfejs dla usługi lokalizacji

2. **i18NextService** (`src/lib/services/localization/i18-next-service.ts`):

   - Implementuje interfejs ILocalizationService
   - Inicjalizuje i18next
   - Dostarcza metody do tłumaczenia, zmiany języka i pobierania dostępnych języków

3. **LanguageContext** (`src/contexts/language-context.tsx`):

   - Zapewnia stan języka i metody w całej aplikacji
   - Eksportuje hook useTranslations dla łatwego dostępu do funkcji tłumaczeniowych

4. **AppContext** (`src/contexts/app-context.tsx`):

   - Inicjalizuje i18NextService za pomocą Inversify do wstrzykiwania zależności

5. **LanguageSelector** (`src/components/blocks/language-selector.tsx`):
   - Komponent wielokrotnego użytku do zmiany języka aplikacji

## Szczegóły implementacji

[Kod pozostaje w języku angielskim, jak w oryginalnej dokumentacji]

## Implementacja kontekstów

System tłumaczeń opiera się głównie na React Context do zarządzania stanem i dostarczania funkcjonalności tłumaczenia w całej aplikacji. Przyjrzyjmy się kluczowym implementacjom kontekstów:

### LanguageContext (`src/contexts/language-context.tsx`)

Ten kontekst zarządza stanem bieżącego języka i dostarcza funkcje tłumaczeniowe.

[Kod pozostaje w języku angielskim, jak w oryginalnej dokumentacji]

### AppContext (`src/contexts/app-context.tsx`)

Ten kontekst inicjalizuje usługę lokalizacji i dostarcza ją do LanguageContext.

[Kod pozostaje w języku angielskim, jak w oryginalnej dokumentacji]

## Korzystanie z kontekstów

Aby korzystać z funkcjonalności tłumaczenia w komponentach:

1. Upewnij się, że Twój komponent jest owinięty w AppProvider (zwykle robione w komponencie głównym).

2. Użyj hooka `useTranslations`, aby uzyskać dostęp do funkcji tłumaczeniowych:

[Przykładowy kod pozostaje w języku angielskim, jak w oryginalnej dokumentacji]

Konteksty współpracują ze sobą, aby zapewnić płynne doświadczenie tłumaczenia:

- AppContext inicjalizuje usługę lokalizacji.
- LanguageContext zarządza bieżącym językiem i dostarcza funkcje tłumaczeniowe.
- Komponenty mogą łatwo uzyskać dostęp i korzystać z tych funkcji poprzez hook `useTranslations`.

To ustawienie pozwala nam łatwo zmienić implementację ILocalizationService w razie potrzeby, bez zmiany kodu konsumującego.

## Jak używać

1. Zaimportuj hook useTranslations:

   ```typescript
   import { useTranslations } from "@/contexts/language-context";
   ```

2. Użyj hooka w swoim komponencie:

   ```typescript
   const { t, setLocale, getLocales, currentLanguage } = useTranslations(
     "NazwaPrzestrzeniNazw",
   );
   ```

3. Tłumacz tekst:

   ```typescript
   const przetłumaczonyTekst = t`nazwaKlucza`;
   ```

4. Zmień język:

   ```typescript
   setLocale("pl");
   ```

5. Pobierz dostępne języki:
   ```typescript
   const dostępneJęzyki = getLocales();
   ```

## Korzystanie z komponentu LanguageSelector

Aby dodać funkcjonalność wyboru języka do swojego komponentu lub strony, możesz użyć gotowego komponentu LanguageSelector:

```typescript
import { LanguageSelector } from "@/components/blocks/language-selector";

function TwójKomponent() {
    return (
        <div>
            <LanguageSelector />
            {/* Reszta Twojego komponentu */}
        </div>
    );
}
```
