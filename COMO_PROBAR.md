# 📋 Guía: Cómo Probar el Proyecto

## Opción 1: Probar Localmente (Requiere Node.js)

### Paso 1: Instalar Node.js (si no lo tienes)

1. **Descargar Node.js:**
   - Ve a: https://nodejs.org/
   - Descarga la versión LTS (recomendada)
   - Instala el archivo descargado

2. **Verificar instalación:**
   ```bash
   node --version  # Debe mostrar v18.x.x o superior
   npm --version   # Debe mostrar 9.x.x o superior
   ```

### Paso 2: Instalar Dependencias del Proyecto

Abre PowerShell o CMD en la carpeta del proyecto y ejecuta:

```bash
# Navegar a la carpeta del proyecto (si no estás ahí)
cd C:\Users\HP\Documents\GitHub\examen-2025-ii-si784-u2-AntonyChata

# Instalar dependencias de Node.js
npm install

# Instalar navegadores de Playwright (esto puede tardar 5-10 minutos)
npm run test:install
```

### Paso 3: Ejecutar las Pruebas

```bash
# Ejecutar todas las pruebas en modo headless (sin ventana)
npm test

# O ejecutar con navegador visible (recomendado para ver qué pasa)
npm run test:headed

# O ejecutar con interfaz visual interactiva (MÁS FÁCIL)
npm run test:ui
```

### Paso 4: Ver los Resultados

```bash
# Ver reporte HTML después de ejecutar pruebas
npm run test:report
```

---

## Opción 2: Probar en GitHub Actions (SIN Instalar Nada Localmente) ⭐ RECOMENDADO

Esta es la forma más fácil si no quieres instalar Node.js:

### Paso 1: Subir el Código a GitHub

```bash
# Si ya tienes git configurado
git add .
git commit -m "Initial commit: Pruebas E2E Repositorio UPT"
git push origin main
```

### Paso 2: Ver las Pruebas en Acción

1. Ve a tu repositorio en GitHub
2. Click en la pestaña **"Actions"** (en la parte superior)
3. Verás el workflow ejecutándose automáticamente
4. Click en el workflow para ver el progreso

### Paso 3: Ver los Resultados

Una vez que termine la ejecución:

1. **Videos de las pruebas:**
   - En la página del workflow, desplázate hacia abajo
   - En "Artifacts" verás:
     - `videos-chromium`
     - `videos-firefox`
     - `videos-webkit`
   - Descarga y reproduce los videos para ver las pruebas

2. **Reportes HTML:**
   - Descarga el artefacto `report-[browser]`
   - Descomprime y abre `index.html` en tu navegador
   - Verás un reporte interactivo con todas las pruebas

3. **Screenshots (si hay errores):**
   - Descarga el artefacto `screenshots-[browser]`
   - Verás capturas de pantalla de dónde falló la prueba

---

## Opción 3: Usar GitHub Codespaces (TODO Automático)

Si tu repositorio tiene Codespaces habilitado:

1. Click en el botón verde **"Code"** en GitHub
2. Selecciona la pestaña **"Codespaces"**
3. Click en **"Create codespace on main"**
4. Espera a que se abra el entorno en tu navegador
5. En la terminal de Codespaces, ejecuta:
   ```bash
   npm install
   npm run test:install
   npm test
   ```

---

## 🎯 Comandos Útiles

### Ejecutar pruebas por navegador específico:
```bash
npm run test:chromium   # Solo Chrome
npm run test:firefox     # Solo Firefox  
npm run test:webkit      # Solo Safari
```

### Modo debug (paso a paso):
```bash
npm run test:debug
```

### Ver solo una prueba específica:
```bash
npx playwright test tests/repositorio-upt.spec.js -g "Web"
```

---

## ⚠️ Solución de Problemas

### Error: "node no se reconoce"
- **Solución:** Instala Node.js desde nodejs.org
- O usa GitHub Actions (Opción 2)

### Error: "Cannot find module '@playwright/test'"
- **Solución:** Ejecuta `npm install`

### Las pruebas fallan con timeout
- **Causa:** El sitio web puede estar lento o no disponible
- **Solución:** Verifica que https://repositorio.upt.edu.pe esté accesible

### No se generan videos
- **Causa:** Los videos solo se generan en CI o cuando hay errores (por defecto)
- **Solución:** En `playwright.config.js` cambia `video: 'on'` para siempre grabar

---

## 📊 Qué Esperar al Ejecutar las Pruebas

Las pruebas harán lo siguiente:

1. ✅ Abrir el repositorio UPT
2. ✅ Buscar términos de tecnología (web, base de datos, móvil, etc.)
3. ✅ Verificar que se obtengan resultados
4. ✅ Tomar screenshots si hay problemas
5. ✅ Generar videos (en CI)
6. ✅ Crear reportes HTML con los resultados

**Tiempo estimado:** 5-15 minutos dependiendo de la cantidad de pruebas

---

## ✅ Verificación Final

Después de ejecutar las pruebas, deberías ver:

- ✅ Reportes en la consola
- ✅ Carpeta `test-results/` con screenshots
- ✅ Carpeta `playwright-report/` con reporte HTML
- ✅ Videos en `test-results/` (si están configurados)
- ✅ Mensaje "X passed" si todo fue exitoso

¡Listo! 🎉

