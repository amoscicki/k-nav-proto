# Documentación del sistema de traducción

## Visión general

Nuestro proyecto utiliza un sistema de traducción robusto basado en la biblioteca i18next, integrado perfectamente con React a través de hooks y contextos personalizados. Esta configuración proporciona una solución flexible y eficiente para internacionalizar la aplicación, aprovechando los principios de Inversión de Control (IoC).

## Componentes clave y sus ubicaciones

1. **ILocalizationService** (`src/lib/services/localization/localization-service.interface.ts`):
    - Define la interfaz para el servicio de localización

2. **i18NextService** (`src/lib/services/localization/i18-next-service.ts`):
    - Implementa la interfaz ILocalizationService
    - Inicializa i18next
    - Proporciona métodos para traducción, cambio de idioma y obtención de idiomas disponibles

3. **LanguageContext** (`src/contexts/language-context.tsx`):
    - Proporciona el estado del idioma y métodos en toda la aplicación
    - Exporta el hook useTranslations para un fácil acceso a las funciones de traducción

4. **AppContext** (`src/contexts/app-context.tsx`):
    - Inicializa i18NextService utilizando Inversify para la inyección de dependencias

5. **LanguageSelector** (`src/components/blocks/language-selector.tsx`):
    - Un componente reutilizable para cambiar el idioma de la aplicación

## Detalles de implementación

[El código permanece en inglés, como en la documentación original]

## Implementación de contextos

El sistema de traducción se basa en gran medida en React Context para la gestión del estado y para proporcionar funcionalidad de traducción en toda la aplicación. Veamos las implementaciones clave de los contextos:

### LanguageContext (`src/contexts/language-context.tsx`)

Este contexto gestiona el estado del idioma actual y proporciona funciones de traducción.

[El código permanece en inglés, como en la documentación original]

### AppContext (`src/contexts/app-context.tsx`)

Este contexto inicializa el servicio de localización y lo proporciona al LanguageContext.

[El código permanece en inglés, como en la documentación original]

## Uso de los contextos

Para utilizar la funcionalidad de traducción en tus componentes:

1. Asegúrate de que tu componente esté envuelto con el AppProvider (generalmente se hace en el componente raíz).

2. Utiliza el hook `useTranslations` para acceder a las funciones de traducción:

[El código de ejemplo permanece en inglés, como en la documentación original]

Los contextos trabajan juntos para proporcionar una experiencia de traducción fluida:
- AppContext inicializa el servicio de localización.
- LanguageContext gestiona el idioma actual y proporciona funciones de traducción.
- Los componentes pueden acceder y utilizar fácilmente estas funciones a través del hook `useTranslations`.

Esta configuración nos permite cambiar fácilmente la implementación de ILocalizationService si es necesario, sin cambiar el código consumidor.

## Cómo usar

1. Importa el hook useTranslations:
   ```typescript
   import { useTranslations } from '@/contexts/language-context';
   ```

2. Usa el hook en tu componente:
   ```typescript
   const { t, setLocale, getLocales, currentLanguage } = useTranslations('NombreDelEspacio');
   ```

3. Traduce texto:
   ```typescript
   const textoTraducido = t`nombreClave`;
   ```

4. Cambia el idioma:
   ```typescript
   setLocale('es');
   ```

5. Obtén los idiomas disponibles:
   ```typescript
   const idiomasDisponibles = getLocales();
   ```

## Uso del componente LanguageSelector

Para añadir funcionalidad de selección de idioma a tu componente o página, puedes usar el componente LanguageSelector pre-construido:

```typescript
import { LanguageSelector } from "@/components/blocks/language-selector";

function TuComponente() {
    return (
        <div>
            <LanguageSelector />
            {/* Resto de tu componente */}
        </div>
    );
}
```