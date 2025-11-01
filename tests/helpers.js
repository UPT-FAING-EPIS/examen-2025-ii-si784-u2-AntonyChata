/**
 * Helpers y utilidades para las pruebas E2E del repositorio UPT
 */

/**
 * Espera a que un elemento sea visible con múltiples intentos
 * @param {import('@playwright/test').Page} page - La página de Playwright
 * @param {string[]} selectors - Array de selectores CSS a probar
 * @param {number} timeout - Timeout en milisegundos (default: 5000)
 * @returns {Promise<import('@playwright/test').Locator | null>} El elemento encontrado o null
 */
export async function waitForElementWithRetry(page, selectors, timeout = 5000) {
  for (const selector of selectors) {
    try {
      const element = page.locator(selector).first();
      await element.waitFor({ state: 'visible', timeout });
      return element;
    } catch (e) {
      continue;
    }
  }
  return null;
}

/**
 * Obtiene el texto visible de un elemento de forma segura
 * @param {import('@playwright/test').Locator} locator - El locator del elemento
 * @param {string} defaultValue - Valor por defecto si falla
 * @returns {Promise<string>} El texto del elemento
 */
export async function getTextSafe(locator, defaultValue = '') {
  try {
    return await locator.textContent() || defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

/**
 * Verifica si un elemento es visible de forma segura
 * @param {import('@playwright/test').Locator} locator - El locator del elemento
 * @param {number} timeout - Timeout en milisegundos
 * @returns {Promise<boolean>} true si es visible, false en caso contrario
 */
export async function isVisibleSafe(locator, timeout = 1000) {
  try {
    return await locator.isVisible({ timeout });
  } catch (e) {
    return false;
  }
}

/**
 * Espera a que la página cargue completamente
 * @param {import('@playwright/test').Page} page - La página de Playwright
 * @param {number} timeout - Timeout en milisegundos
 */
export async function waitForPageLoad(page, timeout = 15000) {
  await page.waitForLoadState('networkidle', { timeout }).catch(() => {
    return page.waitForSelector('body', { timeout: 10000 });
  });
  
  await page.waitForFunction(() => {
    return document.readyState === 'complete';
  }, { timeout: 10000 }).catch(() => {});
}

/**
 * Sanitiza un nombre de archivo para screenshots
 * @param {string} name - Nombre a sanitizar
 * @returns {string} Nombre sanitizado
 */
export function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 50);
}

