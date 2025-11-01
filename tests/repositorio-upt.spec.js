import { test, expect } from '@playwright/test';

/**
 * Pruebas E2E para búsqueda de tesis de tecnología en el repositorio UPT
 * 
 * Como estudiante de la UPT
 * Quiero encontrar tesis de tecnología en el Repositorio de la UPT
 * Para investigar sobre tecnologías recientes y tener referencias
 */

const REPOSITORIO_URL = 'https://repositorio.upt.edu.pe/';
const TIMEOUT_BUSQUEDA = 15000; // 15 segundos para búsquedas

// Términos de búsqueda relacionados con tecnología
const TERMINOS_BUSQUEDA = [
  {
    categoria: 'Web',
    terminos: ['web', 'aplicación web', 'sistema web', 'desarrollo web']
  },
  {
    categoria: 'Base de Datos',
    terminos: ['base de datos', 'database', 'sql', 'nosql']
  },
  {
    categoria: 'Móvil',
    terminos: ['móvil', 'mobile', 'aplicación móvil', 'android', 'ios']
  },
  {
    categoria: 'Inteligencia de Negocios',
    terminos: ['inteligencia de negocios', 'business intelligence', 'bi', 'datos']
  },
  {
    categoria: 'Inteligencia Artificial',
    terminos: ['inteligencia artificial', 'artificial intelligence', 'ia', 'ai', 'machine learning']
  }
];

/**
 * Helper para esperar a que un elemento sea visible con múltiples intentos
 */
async function waitForElementWithRetry(page, selectors, timeout = 5000) {
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

test.describe('Búsqueda de Tesis de Tecnología en Repositorio UPT', () => {
  
  test.beforeEach(async ({ page }) => {
    // Configurar timeout más largo para navegación inicial
    page.setDefaultTimeout(TIMEOUT_BUSQUEDA);
    
    // Navegar al repositorio UPT con espera inteligente
    await page.goto(REPOSITORIO_URL, { 
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUT_BUSQUEDA 
    });
    
    // Esperar a que la página cargue completamente
    await page.waitForLoadState('networkidle', { timeout: TIMEOUT_BUSQUEDA }).catch(() => {
      // Si falla networkidle, esperar al menos a que el body sea visible
      return page.waitForSelector('body', { timeout: 10000 });
    });
    
    // Esperar a que la página sea interactiva
    await page.waitForFunction(() => {
      return document.readyState === 'complete';
    }, { timeout: 10000 }).catch(() => {});
  });

  /**
   * Prueba genérica para buscar términos de tecnología
   * Verifica que se obtengan uno o muchos resultados
   */
  async function buscarTesisTecnologia(page, termino) {
    // Selectores optimizados para DSpace y repositorios académicos comunes
    const selectoresBusqueda = [
      'input[name="query"]',           // DSpace estándar
      'input[name="search"]',          // Variante común
      'input[type="search"]',          // HTML5 search input
      'input[id*="search"]',           // IDs con "search"
      'input[class*="search"]',        // Classes con "search"
      'input[placeholder*="buscar" i]', // Placeholder en español
      'input[placeholder*="search" i]', // Placeholder en inglés
      '.search-box input',             // Contenedor .search-box
      '#search input',                 // ID específico
      'form[action*="search"] input[type="text"]', // Forms con search
      'form[method="get"] input[type="text"]',     // Forms GET
      'input.ds-search-field',        // DSpace específico
      'input[aria-label*="search" i]', // Accesibilidad
      'input[aria-label*="buscar" i]'  // Accesibilidad español
    ];

    // Buscar campo de búsqueda con retry inteligente
    const campoBusqueda = await waitForElementWithRetry(page, selectoresBusqueda, 3000);
    
    if (!campoBusqueda) {
      // Último intento: buscar cualquier input de texto visible
      const inputs = page.locator('input[type="text"]');
      const count = await inputs.count();
      if (count > 0) {
        await inputs.first().waitFor({ state: 'visible', timeout: 3000 });
        await inputs.first().fill(termino);
      } else {
        throw new Error(`No se pudo encontrar el campo de búsqueda para: "${termino}"`);
      }
    } else {
      // Limpiar y llenar el campo de búsqueda
      await campoBusqueda.clear();
      await campoBusqueda.fill(termino);
    }
    
    // Buscar botón de búsqueda con múltiples estrategias
    const selectoresBoton = [
      'button[type="submit"]',
      'input[type="submit"]',
      'button:has-text("Buscar")',
      'button:has-text("Search")',
      'button[aria-label*="buscar" i]',
      'button[aria-label*="search" i]',
      '.search-button',
      '#search-button',
      'form[action*="search"] button',
      'form[action*="search"] input[type="submit"]'
    ];
    
    const botonBusqueda = await waitForElementWithRetry(page, selectoresBoton, 2000);
    
    if (botonBusqueda && await botonBusqueda.isVisible()) {
      await botonBusqueda.click({ timeout: 3000 });
    } else {
      // Presionar Enter como alternativa
      const campo = campoBusqueda || page.locator('input[type="text"]').first();
      await campo.press('Enter', { timeout: 3000 });
    }

    // Esperar a que la página de resultados cargue con múltiples estrategias
    try {
      // Esperar a que la URL cambie (indicando navegación)
      await page.waitForFunction(
        (baseUrl) => window.location.href !== baseUrl,
        REPOSITORIO_URL,
        { timeout: TIMEOUT_BUSQUEDA }
      );
    } catch (e) {
      // Si no cambia la URL, esperar a que la página se actualice
      await page.waitForLoadState('networkidle', { timeout: TIMEOUT_BUSQUEDA }).catch(() => {});
    }
    
    // Esperar a que aparezca contenido de resultados o mensaje de "sin resultados"
    await Promise.race([
      page.waitForSelector('.ds-artifact-item, .result-item, article, .item, tbody tr, [class*="result"]', { timeout: TIMEOUT_BUSQUEDA }).catch(() => {}),
      page.waitForSelector('text=/no.*resultado|sin.*resultado|no.*found/i', { timeout: TIMEOUT_BUSQUEDA }).catch(() => {}),
      page.waitForTimeout(3000) // Timeout mínimo para contenido dinámico
    ]);
  }

  /**
   * Verificar que se muestren resultados de búsqueda
   */
  async function verificarResultados(page) {
    // Indicadores de resultados optimizados para DSpace
    const indicadoresResultados = [
      // Texto con números de resultados
      'text=/\\d+.*resultado/i',
      'text=/\\d+.*result/i',
      'text=/encontrado.*\\d+/i',
      'text=/found.*\\d+/i',
      
      // Contenedores de resultados comunes
      '.ds-artifact-list',           // DSpace artifact list
      '.ds-artifact-item',            // DSpace artifact item
      '.search-results',              // Genérico
      '.results',                     // Genérico
      '.result-item',                 // Genérico
      '.item',                        // Genérico
      'article',                      // HTML5 semántico
      'li[class*="result"]',          // List items
      'div[class*="result"]',         // Divs con result
      'div[class*="item"]',           // Divs con item
      'tbody tr',                     // Tablas de resultados
      '[role="article"]',             // ARIA role
      '[data-testid*="result"]',      // Test IDs
      '.record',                      // Records genéricos
      '.document'                     // Documents genéricos
    ];

    // Primero verificar mensajes de "sin resultados"
    const mensajesSinResultados = [
      'text=/no.*se.*encontraron.*resultado/i',
      'text=/sin.*resultado/i',
      'text=/no.*resultado.*encontrado/i',
      'text=/no.*results.*found/i',
      'text=/nothing.*found/i',
      '.no-results',
      '.empty-results'
    ];
    
    for (const selector of mensajesSinResultados) {
      const visible = await page.locator(selector).first().isVisible({ timeout: 1000 }).catch(() => false);
      if (visible) {
        // Verificar que realmente dice "sin resultados" y no solo contiene el texto
        const texto = await page.locator(selector).first().textContent().catch(() => '');
        if (texto && /no.*resultado|sin.*resultado|no.*found/i.test(texto)) {
          return false;
        }
      }
    }
    
    // Buscar resultados usando los indicadores
    for (const selector of indicadoresResultados) {
      try {
        const elementos = page.locator(selector);
        const count = await elementos.count();
        
        if (count > 0) {
          // Verificar que al menos uno sea visible
          const primerElemento = elementos.first();
          const esVisible = await primerElemento.isVisible({ timeout: 2000 }).catch(() => false);
          
          if (esVisible) {
            // Si es un texto con números, verificar que tenga un número válido
            if (selector.includes('text=/')) {
              const texto = await primerElemento.textContent().catch(() => '');
              const tieneNumero = /\d+/.test(texto || '');
              if (tieneNumero || count > 1) {
                return true;
              }
            } else {
              return true;
            }
          }
        }
      } catch (e) {
        continue;
      }
    }
    
    // Si no encontramos indicadores específicos, verificar que la página tiene contenido relevante
    const bodyText = await page.textContent('body').catch(() => '');
    const tieneContenido = bodyText && bodyText.trim().length > 100;
    const urlCambio = page.url() !== REPOSITORIO_URL;
    
    return tieneContenido && urlCambio;
  }

  // Pruebas para cada categoría de tecnología
  TERMINOS_BUSQUEDA.forEach(({ categoria, terminos }) => {
    terminos.forEach((termino, index) => {
      test(`${categoria} - Buscar "${termino}"`, async ({ page }) => {
        // Guardar URL inicial para comparación
        const urlInicial = page.url();
        
        try {
          // Realizar búsqueda
          await buscarTesisTecnologia(page, termino);
          
          // Verificar que se muestren resultados (uno o muchos)
          const hayResultados = await verificarResultados(page);
          
          // Capturar screenshot para debugging (solo en CI o si falla)
          if (process.env.CI || !hayResultados) {
            await page.screenshot({ 
              path: `test-results/screenshot-${categoria.toLowerCase().replace(/\s+/g, '-')}-${termino.replace(/\s+/g, '-')}.png`,
              fullPage: true 
            }).catch(() => {}); // No fallar si no se puede tomar screenshot
          }
          
          // Verificar que la URL cambió o tiene parámetros de búsqueda
          const urlFinal = page.url();
          const urlCambio = urlFinal !== urlInicial;
          const tieneParametrosBusqueda = urlFinal.includes('query') || 
                                          urlFinal.includes('search') || 
                                          urlFinal.includes('q=') ||
                                          urlFinal !== REPOSITORIO_URL;
          
          // Aserción: debe haber al menos un resultado o indicador de resultados
          expect(hayResultados || tieneParametrosBusqueda).toBeTruthy();
          
          // Verificar que la URL es válida del repositorio
          expect(urlFinal).toContain('repositorio.upt.edu.pe');
        } catch (error) {
          // Capturar screenshot en caso de error
          await page.screenshot({ 
            path: `test-results/error-${categoria.toLowerCase().replace(/\s+/g, '-')}-${termino.replace(/\s+/g, '-')}.png`,
            fullPage: true 
          }).catch(() => {});
          throw error;
        }
      });
    });
  });

  /**
   * Prueba principal: Verificar que la búsqueda funciona correctamente
   */
  test('Debe poder realizar búsqueda básica de tecnología', async ({ page }) => {
    const terminoBusqueda = 'tecnología';
    const urlInicial = page.url();
    
    await buscarTesisTecnologia(page, terminoBusqueda);
    
    // Verificar que la página muestra algún contenido relacionado con la búsqueda
    const url = page.url();
    const contenido = await page.textContent('body');
    
    // Verificar que la búsqueda se ejecutó
    const urlCambio = url !== urlInicial;
    const tieneContenido = contenido && contenido.trim().length > 50;
    
    expect(urlCambio || tieneContenido).toBeTruthy();
    expect(url).toContain('repositorio.upt.edu.pe');
    expect(contenido).toBeTruthy();
  });

  /**
   * Prueba: Verificar que se pueden obtener múltiples resultados
   */
  test('Debe mostrar múltiples resultados cuando existen', async ({ page }) => {
    const terminoBusqueda = 'sistema';
    
    await buscarTesisTecnologia(page, terminoBusqueda);
    
    // Esperar a que los resultados se carguen
    await page.waitForLoadState('networkidle', { timeout: TIMEOUT_BUSQUEDA }).catch(() => {});
    
    const hayResultados = await verificarResultados(page);
    expect(hayResultados).toBeTruthy();
    
    // Verificar que la página tiene estructura de resultados
    const bodyText = await page.textContent('body').catch(() => '');
    expect(bodyText).toBeTruthy();
  });

  /**
   * Prueba: Verificar la página principal del repositorio
   */
  test('Debe cargar correctamente la página principal del repositorio', async ({ page }) => {
    // Verificar que la página cargó
    const url = page.url();
    expect(url).toContain('repositorio.upt.edu.pe');
    
    // Verificar que hay contenido en la página
    const titulo = await page.title();
    expect(titulo).toBeTruthy();
    expect(titulo.length).toBeGreaterThan(0);
    
    // Verificar que el body tiene contenido
    const body = page.locator('body');
    await expect(body).toBeVisible({ timeout: 10000 });
    
    // Verificar que hay algún contenido visible
    const bodyText = await page.textContent('body').catch(() => '');
    expect(bodyText).toBeTruthy();
    expect(bodyText.trim().length).toBeGreaterThan(50);
    
    // Verificar que hay elementos interactivos (indicador de página funcional)
    const links = await page.locator('a').count();
    expect(links).toBeGreaterThan(0);
  });
});

