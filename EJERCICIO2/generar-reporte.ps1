# Script para generar reporte de cobertura
# Uso: .\generar-reporte.ps1

Write-Host "=== Generando reporte de cobertura ===" -ForegroundColor Cyan

# Verificar que existe el archivo de cobertura
if (-not (Test-Path "coverage-results/coverage.cobertura.xml")) {
    Write-Host "`n❌ Error: No se encontró el archivo de cobertura." -ForegroundColor Red
    Write-Host "Primero ejecuta las pruebas con cobertura:" -ForegroundColor Yellow
    Write-Host "  dotnet test tests/DocumentConverter.Tests/DocumentConverter.Tests.csproj /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura,json /p:CoverletOutput=coverage-results/coverage" -ForegroundColor White
    exit 1
}

# Verificar que reportgenerator está instalado
if (-not (Get-Command reportgenerator -ErrorAction SilentlyContinue)) {
    Write-Host "`n⚠ ReportGenerator no está instalado. Instalándolo..." -ForegroundColor Yellow
    dotnet tool install -g dotnet-reportgenerator-globaltool
}

# Crear directorio de salida
New-Item -ItemType Directory -Force -Path "coverage-reports/html" | Out-Null

# Generar reporte
Write-Host "`nGenerando reporte HTML..." -ForegroundColor Green
reportgenerator -reports:"coverage-results/coverage.cobertura.xml" -targetdir:"coverage-reports/html" -reporttypes:"Html;Badges;JsonSummary" -classfilters:"-*Tests" -assemblyfilters:"+DocumentConverter"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Reporte generado exitosamente!" -ForegroundColor Green
    Write-Host "`n📊 Abre el reporte en tu navegador:" -ForegroundColor Yellow
    $reportPath = (Resolve-Path "coverage-reports/html/index.html").Path
    Write-Host "   $reportPath" -ForegroundColor White
    
    # Intentar abrir automáticamente
    $abrir = Read-Host "`n¿Deseas abrir el reporte ahora? (S/N)"
    if ($abrir -eq "S" -or $abrir -eq "s" -or $abrir -eq "Y" -or $abrir -eq "y") {
        Start-Process $reportPath
    }
} else {
    Write-Host "`n❌ Error al generar el reporte." -ForegroundColor Red
    exit 1
}

