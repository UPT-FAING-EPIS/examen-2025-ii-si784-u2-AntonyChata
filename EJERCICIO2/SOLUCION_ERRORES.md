# 🔧 Solución a los Errores que Tuviste

## ❌ Error 1: Sintaxis de reportgenerator

### Lo que intentaste:
```powershell
reportgenerator
  -reports:"coverage-results/coverage.cobertura.xml" `
  ...
```

### ❌ Problema:
En PowerShell, cuando usas backtick (`) para continuar líneas, no puedes poner argumentos en la siguiente línea directamente. Además, el comando debe estar todo en una línea o usar el formato correcto.

### ✅ Solución CORRECTA (Opción 1 - Una Línea):
```powershell
reportgenerator -reports:"coverage-results/coverage.cobertura.xml" -targetdir:"coverage-reports/html" -reporttypes:"Html;Badges;JsonSummary" -classfilters:"-*Tests" -assemblyfilters:"+DocumentConverter"
```

### ✅ Solución CORRECTA (Opción 2 - Múltiples Líneas con Backtick):
```powershell
reportgenerator `
  -reports:"coverage-results/coverage.cobertura.xml" `
  -targetdir:"coverage-reports/html" `
  -reporttypes:"Html;Badges;JsonSummary" `
  -classfilters:"-*Tests" `
  -assemblyfilters:"+DocumentConverter"
```

**IMPORTANTE:** El backtick (`) debe estar al FINAL de cada línea, no al inicio.

### ✅ Solución CORRECTA (Opción 3 - Usar el Script):
```powershell
.\generar-reporte.ps1
```

---

## ❌ Error 2: Intentar "ejecutar" un archivo HTML

### Lo que intentaste:
```powershell
ejercicio2/coverage-reports/html/index.html
```

### ❌ Problema:
PowerShell interpreta esto como un comando, no como un archivo para abrir.

### ✅ Solución CORRECTA (Opción 1):
```powershell
Start-Process coverage-reports/html/index.html
```

### ✅ Solución CORRECTA (Opción 2):
```powershell
Invoke-Item coverage-reports/html/index.html
```

### ✅ Solución CORRECTA (Opción 3 - Desde Explorador):
1. Abre el Explorador de Windows
2. Navega a: `ejercicio2\coverage-reports\html\`
3. Doble click en `index.html`

### ✅ Solución CORRECTA (Opción 4 - Ruta Completa):
```powershell
Start-Process "C:\Users\HP\Documents\GitHub\examen-2025-ii-si784-u2-AntonyChata\ejercicio2\coverage-reports\html\index.html"
```

---

## 📋 Comandos Correctos - Copia y Pega Directamente

### Paso 1: Generar Cobertura (Ya lo hiciste ✅)
```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura /p:CoverletOutput=coverage-results/coverage
```

### Paso 2: Generar Reporte HTML
**Copia TODO este comando (una sola línea):**
```powershell
reportgenerator -reports:"coverage-results/coverage.cobertura.xml" -targetdir:"coverage-reports/html" -reporttypes:"Html;Badges;JsonSummary" -classfilters:"-*Tests" -assemblyfilters:"+DocumentConverter"
```

### Paso 3: Abrir el Reporte
```powershell
Start-Process coverage-reports/html/index.html
```

---

## ✅ Verificación Rápida

Después del Paso 2, deberías ver:
```
Report generated in: coverage-reports/html
```

Entonces ejecuta el Paso 3 para abrirlo.

---

## 💡 Tip: Usar el Script Automático

Para evitar estos errores, usa el script que creé:

```powershell
.\generar-reporte.ps1
```

Este script:
- ✅ Verifica que existe el archivo de cobertura
- ✅ Instala reportgenerator si falta
- ✅ Genera el reporte correctamente
- ✅ Te pregunta si quieres abrirlo automáticamente

