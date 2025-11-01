# 🔧 Solución: Ejercicio 1 se Queda en "In Progress"

## ❌ Problema
El job del Ejercicio 1 (E2E Repositorio UPT) se queda en estado "In progress" y no termina.

## ✅ Cambios Aplicados (Solo Ejercicio 1)

### 1. **Optimización de Instalación de Dependencias**
```yaml
npm install --prefer-offline --no-audit
```
- `--prefer-offline`: Usa caché cuando está disponible
- `--no-audit`: Omite el audit de seguridad (más rápido)

### 2. **Timeout para Instalación de Navegadores**
```yaml
timeout-minutes: 10
```
- Evita que se quede colgado si la instalación es lenta

### 3. **Verificación de Configuración**
- Paso agregado para verificar que Playwright está correctamente configurado
- Muestra información útil si algo falla

### 4. **Timeout Explícito en Ejecución de Pruebas**
```yaml
--timeout=30000
timeout-minutes: 60
```
- Timeout de 30 segundos por prueba (en lugar del default)
- Timeout total de 60 minutos para el paso

## 📋 Qué Hacer

1. **Hacer commit y push:**
```powershell
git add .github/workflows/test.yml
git commit -m "fix: Optimizar Ejercicio 1 E2E para evitar que se quede colgado"
git push origin main
```

2. **Monitorear la ejecución:**
   - Ve a GitHub → Actions
   - Abre el workflow más reciente
   - Revisa los logs del job "test (chromium)" o "test (firefox)"
   - Verifica que los pasos avancen correctamente

## 🔍 Si Sigue Colgado

Revisa los logs para ver en qué paso se queda:
- **Si se queda en "Instalar dependencias"**: Problema de red o npm
- **Si se queda en "Instalar navegadores"**: Problema con Playwright
- **Si se queda en "Ejecutar pruebas E2E"**: Las pruebas pueden estar tardando mucho o colgándose

## 📝 Nota

Estos cambios **NO modifican nada del Ejercicio 2** (EJERCICIO2). Solo optimizan el Ejercicio 1.

