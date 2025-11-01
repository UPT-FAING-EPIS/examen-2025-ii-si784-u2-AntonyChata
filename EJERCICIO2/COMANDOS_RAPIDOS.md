# ⚡ Comandos Rápidos - Ejercicio 2

## 🚀 Comandos Esenciales (Copia y Pega)

### 1. Restaurar Dependencias
```powershell
dotnet restore ejercicio2.sln
```

### 2. Compilar
```powershell
dotnet build ejercicio2.sln
```

### 3. Ejecutar Pruebas Unitarias
```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj
```

### 4. Ejecutar Pruebas con Cobertura
```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura /p:CoverletOutput=coverage-results/coverage
```

**NOTA:** Ya tienes 100% de cobertura! ✅

### 5. Generar Reporte HTML (OPCIÓN A - Usando Script)
```powershell
.\generar-reporte.ps1
```

### 5. Generar Reporte HTML (OPCIÓN B - Comando Completo en Una Línea)
```powershell
reportgenerator -reports:"coverage-results/coverage.cobertura.xml" -targetdir:"coverage-reports/html" -reporttypes:"Html;Badges;JsonSummary" -classfilters:"-*Tests" -assemblyfilters:"+DocumentConverter"
```

### 6. Ejecutar Pruebas BDD
```powershell
dotnet test bdd-tests/DocumentConverter.BDD/DocumentConverter.BDD.csproj
```

---

## 📊 Abrir el Reporte HTML

**NO ejecutes el archivo como comando.** Usa uno de estos métodos:

### Método 1: Doble Click
1. Abre el Explorador de Windows
2. Navega a: `ejercicio2\coverage-reports\html\`
3. Doble click en `index.html`

### Método 2: Desde PowerShell
```powershell
Start-Process coverage-reports/html/index.html
```

### Método 3: Desde PowerShell (Ruta Completa)
```powershell
Start-Process "C:\Users\HP\Documents\GitHub\examen-2025-ii-si784-u2-AntonyChata\ejercicio2\coverage-reports\html\index.html"
```

---

## 🔧 Instalar ReportGenerator (Solo Primera Vez)

```powershell
dotnet tool install -g dotnet-reportgenerator-globaltool
```

---

## ⚠️ Problemas Comunes

### Error: "reportgenerator no se reconoce"
**Solución:**
```powershell
dotnet tool install -g dotnet-reportgenerator-globaltool
```

Luego cierra y abre nuevamente PowerShell para que cargue la variable de entorno.

### Error: "No se encontró coverage.cobertura.xml"
**Solución:** Primero ejecuta las pruebas con cobertura:
```powershell
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura /p:CoverletOutput=coverage-results/coverage
```

### Error: No puedo abrir el HTML
**Solución:** 
1. Abre el Explorador de Windows
2. Ve a la carpeta `coverage-reports\html`
3. Doble click en `index.html`

---

## 📋 Secuencia Completa (Desde Cero)

```powershell
# 1. Ir al directorio
cd ejercicio2

# 2. Restaurar
dotnet restore ejercicio2.sln

# 3. Compilar
dotnet build ejercicio2.sln

# 4. Ejecutar pruebas con cobertura
dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura,json /p:CoverletOutput=coverage-results/coverage

# 5. Generar reporte (si tienes reportgenerator instalado)
.\generar-reporte.ps1

# O si no tienes el script:
reportgenerator -reports:"coverage-results/coverage.cobertura.xml" -targetdir:"coverage-reports/html" -reporttypes:"Html;Badges;JsonSummary" -classfilters:"-*Tests" -assemblyfilters:"+DocumentConverter"

# 6. Abrir reporte
Start-Process coverage-reports/html/index.html
```

---

## ✅ Verificación Rápida

Después de ejecutar las pruebas, deberías ver:
- ✅ Carpeta `coverage-results/` con archivos `.xml` y `.json`
- ✅ Carpeta `coverage-reports/html/` con `index.html`
- ✅ En la consola: "Total tests: 35, Passed: 35"

