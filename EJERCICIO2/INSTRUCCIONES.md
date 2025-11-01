# 📋 Instrucciones Ejercicio 2

## ✅ Lo que está Implementado

1. ✅ **Aplicación Document Converter**
   - Patrón Factory implementado
   - Conversores: DOCX, PDF, TXT

2. ✅ **Pruebas Unitarias**
   - 20+ pruebas unitarias
   - Cobertura objetivo: 80%+
   - Framework: xUnit + Coverlet

3. ✅ **Pruebas BDD**
   - Especificaciones en formato Gherkin (.feature)
   - Implementación con SpecFlow
   - Escenarios para todos los casos de uso

4. ✅ **Automatización en GitHub Actions**
   - Ejecución automática de pruebas unitarias
   - Ejecución automática de pruebas BDD
   - Generación de reportes HTML
   - Publicación en GitHub Pages

## 🚀 Cómo Funciona

### En GitHub Actions

Al hacer push al repositorio:

1. **Ejercicio 1** (E2E Repositorio UPT) se ejecuta
2. **Ejercicio 2** se ejecuta en paralelo:
   - Pruebas unitarias con análisis de cobertura
   - Pruebas BDD con SpecFlow
   - Generación de reportes
   - Verificación de cobertura mínima (80%)
3. **Publicación** en GitHub Pages automáticamente

### Ver Resultados

1. Ve a tu repositorio en GitHub
2. Pestaña **"Actions"** → Ver ejecuciones
3. Descarga artefactos:
   - `ejercicio2-coverage-report`
   - `ejercicio2-bdd-report`
4. Ver en GitHub Pages:
   - Ve a Settings → Pages
   - URL: `https://[tu-usuario].github.io/examen-2025-ii-si784-u2-AntonyChata/reports/`

## 📊 Reportes Disponibles

- **Cobertura de Código**: HTML interactivo con porcentajes por clase
- **Pruebas BDD**: Reporte HTML con escenarios ejecutados
- **Badges**: Badges de cobertura para README

## 🔧 Ejecutar Localmente

### Requisitos
- .NET 8.0 SDK instalado

### Pasos

```bash
# Navegar al ejercicio
cd ejercicio2

# Restaurar dependencias
dotnet restore ejercicio2.sln

# Ejecutar pruebas unitarias
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj

# Ejecutar pruebas BDD
dotnet test bdd-tests/DocumentConverter.BDD/DocumentConverter.BDD.csproj

# Con cobertura
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj \
  /p:CollectCoverage=true \
  /p:CoverletOutputFormat=cobertura
```

## 📝 Estructura

```
ejercicio2/
├── src/DocumentConverter/          # Código fuente
│   ├── IDocumentConverter.cs
│   ├── DocxConverter.cs
│   ├── PdfConverter.cs
│   ├── TxtConverter.cs
│   └── DocumentConverterFactory.cs
├── tests/DocumentConverter.Tests/  # Pruebas unitarias
│   ├── DocxConverterTests.cs
│   ├── PdfConverterTests.cs
│   ├── TxtConverterTests.cs
│   ├── DocumentConverterFactoryTests.cs
│   └── IntegrationTests.cs
└── bdd-tests/DocumentConverter.BDD/ # Pruebas BDD
    ├── Features/
    │   └── DocumentConversion.feature
    └── Steps/
        └── DocumentConversionSteps.cs
```

## ✅ Verificación de Cobertura

El workflow verifica automáticamente que la cobertura sea ≥ 80%.
Si es menor, el job fallará con un mensaje claro.

## 🎯 Próximos Pasos

1. Hacer commit y push del código
2. Verificar que GitHub Actions ejecute correctamente
3. Revisar reportes en GitHub Pages
4. Verificar que la cobertura sea ≥ 80%

