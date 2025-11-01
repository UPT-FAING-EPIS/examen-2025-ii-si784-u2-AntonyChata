import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright para pruebas E2E del repositorio UPT
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Timeout máximo para cada prueba - aumentado para búsquedas web */
  timeout: 45 * 1000,
  
  /* Timeout global para todas las operaciones */
  globalTimeout: 60 * 60 * 1000, // 1 hora máximo
  
  /* Timeout para las aserciones */
  expect: {
    timeout: 10000, // 10 segundos para aserciones
    /* Comparación visual para screenshots */
    toHaveScreenshot: { threshold: 0.2 },
    toMatchSnapshot: { threshold: 0.2 },
  },
  
  /* Ejecutar pruebas en paralelo */
  fullyParallel: true,
  
  /* No ejecutar en CI/CD si no está configurado */
  forbidOnly: !!process.env.CI,
  
  /* Reintentar pruebas fallidas en CI */
  retries: process.env.CI ? 2 : 0,
  
  /* Workers en CI vs local - optimizado */
  workers: process.env.CI ? 1 : 2,
  
  /* Reporte mejorado */
  reporter: process.env.CI 
    ? [
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
        ['list'],
        ['json', { outputFile: 'test-results/results.json' }],
        ['junit', { outputFile: 'test-results/junit.xml' }]
      ]
    : [
        ['html', { open: 'on-failure' }],
        ['list'],
        ['json', { outputFile: 'test-results/results.json' }]
      ],
  
  /* Configuración compartida para todas las pruebas */
  use: {
    /* Base URL del repositorio UPT */
    baseURL: 'https://repositorio.upt.edu.pe',
    
    /* Navegación más robusta */
    navigationTimeout: 30000,
    actionTimeout: 15000,
    
    /* Trazabilidad - mejorado para CI */
    trace: process.env.CI ? 'on' : 'on-first-retry',
    
    /* Captura de pantalla */
    screenshot: process.env.CI ? 'only-on-failure' : 'only-on-failure',
    
    /* Video - siempre grabar en CI para tener videos de todas las ejecuciones */
    video: process.env.CI ? 'on' : 'on-first-retry',
    
    /* Viewport consistente */
    viewport: { width: 1280, height: 720 },
    
    /* Ignorar HTTPS errors en desarrollo si es necesario */
    ignoreHTTPSErrors: false,
    
    /* Configuración de red */
    acceptDownloads: true,
    
    /* Headers por defecto para identificar como bot de pruebas */
    extraHTTPHeaders: {
      'User-Agent': 'Playwright Test Runner - UPT Repository Tests'
    },
  },

  /* Configurar proyectos para múltiples navegadores */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        /* Configuración específica para Chrome */
        launchOptions: {
          args: ['--disable-blink-features=AutomationControlled']
        }
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        /* Configuración específica para Firefox */
        launchOptions: {
          firefoxUserPrefs: {
            'dom.webnotifications.enabled': false
          }
        }
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        /* Configuración específica para WebKit */
      },
    },
  ],

  /* Servidor de desarrollo (si es necesario) */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

