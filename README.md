[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/bTwXPjqC)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=21411381)

# Pruebas E2E - Repositorio UPT

## Descripción

Sistema de pruebas end-to-end (E2E) automatizadas para validar la funcionalidad de búsqueda de tesis de tecnología en el Repositorio de Trabajos Académicos de la UPT (https://repositorio.upt.edu.pe/).

### Historia de Usuario

**Como** estudiante de la UPT  
**Quiero** encontrar tesis de tecnología en el Repositorio de la UPT  
**Para** investigar sobre tecnologías recientes y tener referencias

### Requisitos Cumplidos

✅ Pruebas de interfaz de usuario para búsqueda de tesis de tecnología  
✅ Automatización en GitHub Actions con ejecución en múltiples navegadores (Chrome, Firefox, WebKit)  
✅ Generación automática de videos de las ejecuciones de pruebas  
✅ Soporte para búsqueda en categorías: Web, Base de Datos, Móvil, Inteligencia de Negocios, Inteligencia Artificial

## Tecnologías Utilizadas

- **Playwright**: Framework de automatización de pruebas E2E
- **Node.js**: Entorno de ejecución
- **GitHub Actions**: CI/CD para ejecución automatizada

## Instalación

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn

### Pasos

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd examen-2025-ii-si784-u2-AntonyChata
```

2. Instalar dependencias:
```bash
npm install
```

3. Instalar navegadores de Playwright:
```bash
npx playwright install
```

## Uso

### Ejecutar pruebas localmente

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con interfaz visual
npm run test:ui

# Ejecutar pruebas en modo debug
npm run test:debug

# Ejecutar pruebas con navegador visible
npm run test:headed
```

### Ejecutar pruebas en navegadores específicos

```bash
# Solo Chrome
npx playwright test --project=chrome

# Solo Firefox
npx playwright test --project=firefox

# Solo WebKit (Safari)
npx playwright test --project=webkit
```

## Estructura del Proyecto

```
.
├── .github/
│   └── workflows/
│       └── test.yml              # Workflow de GitHub Actions
├── tests/
│   └── repositorio-upt.spec.js   # Pruebas E2E
├── playwright.config.js          # Configuración de Playwright
├── package.json                  # Dependencias y scripts
└── README.md                     # Este archivo
```

## Pruebas Implementadas

Las pruebas cubren las siguientes categorías de tecnología:

1. **Web**: web, aplicación web, sistema web, desarrollo web
2. **Base de Datos**: base de datos, database, sql, nosql
3. **Móvil**: móvil, mobile, aplicación móvil, android, ios
4. **Inteligencia de Negocios**: inteligencia de negocios, business intelligence, bi, datos
5. **Inteligencia Artificial**: inteligencia artificial, artificial intelligence, ia, ai, machine learning

Cada prueba verifica que:
- Se puede realizar la búsqueda correctamente
- Se obtienen uno o muchos resultados
- La página del repositorio funciona correctamente

## GitHub Actions

El workflow de GitHub Actions está configurado para:

- ✅ Ejecutar pruebas en **Chrome** y **Firefox** (mínimo 2 navegadores requeridos)
- ✅ Ejecutar pruebas adicionales en **WebKit** (Safari)
- ✅ Generar **videos** de todas las ejecuciones de pruebas
- ✅ Capturar **screenshots** cuando las pruebas fallan
- ✅ Generar **reportes HTML** detallados
- ✅ Guardar **trazas** de las pruebas para debugging

### Ver resultados en GitHub Actions

1. Ve a la pestaña **Actions** en GitHub
2. Selecciona el workflow ejecutado
3. Descarga los artefactos:
   - `videos-[browser]`: Videos de las ejecuciones
   - `screenshots-[browser]`: Screenshots de fallos
   - `report-[browser]`: Reportes HTML interactivos
   - `traces-[browser]`: Trazas para debugging

### Configuración de videos

Los videos se generan automáticamente para todas las pruebas ejecutadas en CI. Los videos se guardan como archivos `.webm` y están disponibles en los artefactos de GitHub Actions.

## Configuración

### playwright.config.js

La configuración incluye:

- **Timeout**: 30 segundos por prueba
- **Retries**: 2 reintentos en CI
- **Video**: Grabación automática en CI
- **Screenshots**: Solo en fallos
- **Traces**: En primer reintento

## Reportes

Después de ejecutar las pruebas, puedes ver los reportes HTML:

```bash
npx playwright show-report
```

Esto abrirá un reporte interactivo en tu navegador con detalles de todas las pruebas ejecutadas.

## Contribución

1. Crear una rama para la nueva funcionalidad
2. Realizar los cambios
3. Ejecutar las pruebas: `npm test`
4. Crear un Pull Request

## Licencia

MIT

## Autor

Antony Chata - UPT