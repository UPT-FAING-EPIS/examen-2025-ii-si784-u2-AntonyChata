# Ejercicio 2: Document Converter

## Descripción

Aplicación que implementa el patrón Factory para convertir documentos a diferentes formatos (DOCX, PDF, TXT).

## Estructura del Proyecto

```
ejercicio2/
├── src/
│   └── DocumentConverter/          # Aplicación principal
├── tests/
│   └── DocumentConverter.Tests/   # Pruebas unitarias
├── bdd-tests/
│   └── DocumentConverter.BDD/     # Pruebas BDD con SpecFlow
└── ejercicio2.sln                  # Solución de Visual Studio
```

## Tecnologías

- **.NET 8.0**: Framework principal
- **xUnit**: Framework de pruebas unitarias
- **SpecFlow**: Framework BDD
- **Coverlet**: Análisis de cobertura de código
- **ReportGenerator**: Generación de reportes HTML

## Requisitos

- .NET 8.0 SDK
- Visual Studio 2022 o VS Code

## Ejecutar Pruebas

### Pruebas Unitarias
```bash
cd ejercicio2/tests/DocumentConverter.Tests
dotnet test
```

### Pruebas BDD
```bash
cd ejercicio2/bdd-tests/DocumentConverter.BDD
dotnet test
```

### Cobertura de Código
```bash
cd ejercicio2/tests/DocumentConverter.Tests
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura
```

## Cobertura Mínima

- **Requerida**: 80%
- **Verificación**: Automática en GitHub Actions

## Reportes

Los reportes se generan automáticamente en GitHub Actions y se publican en GitHub Pages:
- Reporte de cobertura de código
- Reporte de pruebas BDD

## Arquitectura

El proyecto implementa el patrón Factory:
- `IDocumentConverter`: Interfaz común
- `DocxConverter`, `PdfConverter`, `TxtConverter`: Implementaciones concretas
- `DocumentConverterFactory`: Factory para crear instancias

