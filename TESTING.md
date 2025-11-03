# Testing

Este proyecto utiliza [Vitest](https://vitest.dev/) y [React Testing Library](https://testing-library.com/react) para las pruebas.

## Cobertura Actual

El proyecto tiene tests implementados para:

### ✅ Componentes Testeados
- **FraliLogo** - Logo principal (5 tests)
- **StatItem** - Componente de estadísticas (3 tests)
- **ContentfulStats** - Lista de estadísticas (5 tests)
- **RandomVideo** - Video de fondo aleatorio (5 tests)
- **Footer** - Pie de página (4 tests)
- **LanguageSwitcher** - Selector de idioma (3 tests)

### ✅ Hooks Testeados
- **useTranslations** - Hook de traducciones (2 tests)
- **useIntersectionObserver** - Observer de intersección (4 tests)
- **useMediaQuery** - Media queries responsive (4 tests)

### 📋 Por Testear (Prioridad Alta)
- **Header** - Navegación principal
- **HomePage** - Página principal
- **ContentfulProjects** - Galería de proyectos
- **ProjectGallery** - Galería de proyectos individuales
- **useCounterAnimation** - Animación de contadores
- **useContentful** - Hook de Contentful

## Scripts Disponibles

- `npm test` - Ejecuta los tests en modo watch (se ejecutan automáticamente al cambiar archivos)
- `npm run test:run` - Ejecuta los tests una vez y finaliza
- `npm run test:ui` - Abre la interfaz visual de Vitest para ejecutar y ver los tests
- `npm run test:coverage` - Ejecuta los tests y genera reporte de cobertura

## Estructura de Tests

Los tests se encuentran en las mismas carpetas que los componentes/hooks que prueban, dentro de carpetas `__tests__`:

```
src/
  components/
    __tests__/
      FraliLogo.test.tsx
      StatItem.test.tsx
  hooks/
    __tests__/
      useTranslations.test.tsx
  lib/
    __tests__/
      utils.test.ts
```

## Escribir Nuevos Tests

### Ejemplo: Test de Componente

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MiComponente from '../MiComponente'

describe('MiComponente', () => {
  it('renderiza correctamente', () => {
    render(<MiComponente texto="Hola" />)
    expect(screen.getByText('Hola')).toBeInTheDocument()
  })
})
```

### Ejemplo: Test de Hook

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMiHook } from '../useMiHook'

describe('useMiHook', () => {
  it('retorna valores correctos', () => {
    const { result } = renderHook(() => useMiHook())
    expect(result.current.valor).toBe('esperado')
  })
})
```

## Configuración

- **Vitest Config**: `vitest.config.mjs`
- **Setup**: `src/test/setup.ts` - Configuración global para todos los tests
- **Environment**: `happy-dom` - Entorno DOM ligero para los tests

## Matchers Disponibles

Gracias a `@testing-library/jest-dom`, puedes usar matchers adicionales como:
- `toBeInTheDocument()`
- `toHaveClass()`
- `toHaveAttribute()`
- `toHaveTextContent()`
- Y muchos más...

## Notas

- Los tests se ejecutan en un entorno Node.js con happy-dom simulando el navegador
- Se puede usar `vi.mock()` para hacer mocks de módulos
- Los componentes de Next.js que usan características específicas del servidor pueden necesitar mocks adicionales

