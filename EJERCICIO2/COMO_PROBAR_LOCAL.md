# 🧪 Cómo Probar el Ejercicio 2 Localmente (Sin GitHub)

## ✅ Requisitos Previos

- ✅ .NET 8.0 SDK instalado (ya lo tienes: 8.0.400)
- Editor de texto o Visual Studio (opcional)

## 📋 Paso 1: Navegar al Directorio

```powershell
cd ejercicio2
```

## 📋 Paso 2: Restaurar Dependencias

```powershell
dotnet restore ejercicio2.sln
```

Esto descargará todos los paquetes NuGet necesarios (xUnit, SpecFlow, Coverlet, etc.)

## 📋 Paso 3: Compilar la Solución

```powershell
dotnet build ejercicio2.sln
```

Si todo está bien, deberías ver: `Build succeeded`

---

## 🧪 Paso 4: Ejecutar Pruebas Unitarias

### Ejecución Básica

```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj
```

### Con Salida Detallada

```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj --verbosity normal
```

### Ver Todos los Resultados

```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj --logger "console;verbosity=detailed"
```

**Resultado esperado:** Deberías ver algo como:
```
Total tests: 20
     Passed: 20
     Failed: 0
```

---

## 📊 Paso 5: Ejecutar Pruebas con Cobertura de Código

### Generar Reporte de Cobertura

```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj `
  /p:CollectCoverage=true `
  /p:CoverletOutputFormat=cobertura,json `
  /p:CoverletOutput=../coverage-results/coverage
```

Esto creará:
- `ejercicio2/coverage-results/coverage.cobertura.xml`
- `ejercicio2/coverage-results/coverage.json`

### Ver Cobertura en la Consola

```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj `
  /p:CollectCoverage=true `
  /p:CoverletOutputFormat=opencover,cobertura `
  /p:Threshold=80 `
  /p:ThresholdType=line `
  /p:ThresholdStat=total
```

---

## 📊 Paso 6: Generar Reporte HTML de Cobertura

### Instalar ReportGenerator (solo una vez)

```powershell
dotnet tool install -g dotnet-reportgenerator-globaltool
```

### Generar Reporte HTML XD

```powershell
reportgenerator `
  -reports:"coverage-results/coverage.cobertura.xml" `
  -targetdir:"coverage-reports/html" `
  -reporttypes:"Html;Badges;JsonSummary" `
  -classfilters:"-*Tests" `
  -assemblyfilters:"+DocumentConverter"
```

### Abrir el Reporte

Abre en tu navegador:
```
ejercicio2/coverage-reports/html/index.html
```

Verás un reporte visual con:
- Porcentaje de cobertura por clase
- Líneas cubiertas/no cubiertas
- Gráficos y estadísticas

---

## 🧪 Paso 7: Ejecutar Pruebas BDD

### Ejecución Básica

```powershell
dotnet test bdd-tests/DocumentConverter.BDD/DocumentConverter.BDD.csproj
```

### Con Salida Detallada

```powershell
dotnet test bdd-tests/DocumentConverter.BDD/DocumentConverter.BDD.csproj `
  --logger "console;verbosity=detailed"
```

### Ver Escenarios BDD Ejecutados

```powershell
dotnet test bdd-tests/DocumentConverter.BDD/DocumentConverter.BDD.csproj `
  --logger "trx;LogFileName=bdd-results.trx" `
  --logger "html;LogFileName=bdd-report.html"
```

Los reportes se guardarán en:
- `ejercicio2/bdd-results/bdd-results.trx`
- `ejercicio2/bdd-results/bdd-report.html`

---

## 🚀 Comando Todo-en-Uno (Ejecutar Todo)

Crea un script PowerShell para ejecutar todo de una vez:

```powershell
# Guardar como: ejercicio2/test-all.ps1

Write-Host "=== Restaurando dependencias ===" -ForegroundColor Cyan
dotnet restore ejercicio2.sln

Write-Host "`n=== Compilando solución ===" -ForegroundColor Cyan
dotnet build ejercicio2.sln

Write-Host "`n=== Ejecutando pruebas unitarias ===" -ForegroundColor Green
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj `
  /p:CollectCoverage=true `
  /p:CoverletOutputFormat=cobertura,json `
  /p:CoverletOutput=../coverage-results/coverage

Write-Host "`n=== Ejecutando pruebas BDD ===" -ForegroundColor Green
dotnet test bdd-tests/DocumentConverter.BDD/DocumentConverter.BDD.csproj

Write-Host "`n=== Generando reporte HTML de cobertura ===" -ForegroundColor Yellow
if (Get-Command reportgenerator -ErrorAction SilentlyContinue) {
    reportgenerator `
      -reports:"coverage-results/coverage.cobertura.xml" `
      -targetdir:"coverage-reports/html" `
      -reporttypes:"Html;Badges" `
      -classfilters:"-*Tests" `
      -assemblyfilters:"+DocumentConverter"
    
    Write-Host "`n✓ Reporte generado en: coverage-reports/html/index.html" -ForegroundColor Green
    Write-Host "  Abre el archivo en tu navegador para verlo." -ForegroundColor Yellow
} else {
    Write-Host "⚠ ReportGenerator no está instalado. Instálalo con:" -ForegroundColor Yellow
    Write-Host "  dotnet tool install -g dotnet-reportgenerator-globaltool" -ForegroundColor Yellow
}

Write-Host "`n=== ¡Completado! ===" -ForegroundColor Green
```

### Ejecutar el Script

```powershell
cd ejercicio2
.\test-all.ps1
```

---

## 📊 Verificar Cobertura Mínima (80%)

### Opción 1: Ver en Consola

```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj `
  /p:CollectCoverage=true `
  /p:CoverletOutputFormat=json `
  /p:CoverletOutput=../coverage-results/coverage `
  /p:Threshold=80 `
  /p:ThresholdType=line
```

Si la cobertura es menor a 80%, el comando fallará.

### Opción 2: Ver en Reporte HTML

1. Genera el reporte HTML (Paso 6)
2. Abre `coverage-reports/html/index.html`
3. Busca el porcentaje de "Line coverage" en la parte superior

---

## 🔍 Ver Pruebas Específicas

### Ejecutar Solo Pruebas de DocxConverter

```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj `
  --filter "FullyQualifiedName~DocxConverterTests"
```

### Ejecutar Solo Pruebas del Factory

```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj `
  --filter "FullyQualifiedName~DocumentConverterFactoryTests"
```

### Ejecutar Solo Pruebas BDD de DOCX

No directamente disponible, pero puedes modificar el `.feature` temporalmente.

---

## 🐛 Debugging

### Ejecutar en Modo Debug

```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj `
  --configuration Debug
```

### Ver Lógica de Compilación

```powershell
dotnet build ejercicio2.sln --verbosity detailed
```

---

## 📝 Checklist de Verificación

- [ ] Restaurar dependencias: `dotnet restore`
- [ ] Compilar solución: `dotnet build`
- [ ] Ejecutar pruebas unitarias: `dotnet test tests/...`
- [ ] Generar cobertura: `/p:CollectCoverage=true`
- [ ] Generar reporte HTML: `reportgenerator`
- [ ] Ejecutar pruebas BDD: `dotnet test bdd-tests/...`
- [ ] Verificar cobertura ≥ 80%

---

## 🎯 Resultados Esperados

### Pruebas Unitarias
- ✅ ~20 pruebas pasando
- ✅ Tiempo de ejecución: < 1 segundo
- ✅ Cobertura: ≥ 80%

### Pruebas BDD
- ✅ ~10 escenarios pasando
- ✅ Todos los formatos probados (DOCX, PDF, TXT)
- ✅ Casos de error probados

---

## ❓ Solución de Problemas

### Error: "No se puede encontrar el proyecto"
```powershell
# Asegúrate de estar en el directorio correcto
cd ejercicio2
pwd  # Debería mostrar: .../ejercicio2
```

### Error: "No se pueden restaurar los paquetes"
```powershell
# Limpiar caché de NuGet
dotnet nuget locals all --clear
dotnet restore ejercicio2.sln
```

### Error: "SpecFlow no genera código"
```powershell
# Reconstruir la solución
dotnet clean ejercicio2.sln
dotnet build ejercicio2.sln
```

### Cobertura menor a 80%
- Revisa qué clases no están cubiertas en el reporte HTML
- Agrega más pruebas unitarias para esas clases
- Ejecuta nuevamente hasta alcanzar ≥ 80%

---

## 🎉 ¡Listo!

Ahora puedes probar todo localmente sin necesidad de subir a GitHub.
Los reportes HTML te mostrarán exactamente qué está probado y qué no.


