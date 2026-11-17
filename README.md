# SuperPromos PWA (iPhone / iOS)

Web App instalable (PWA) para iOS diseñada para consultar promociones bancarias en supermercados, calcular topes de reintegro y llevar el registro privado del tope consumido en el teléfono.

## Contexto y Decisiones de Diseño
- **Formato:** PWA (`display: standalone`, `apple-mobile-web-app-capable`) con soporte offline mediante Service Worker (`sw.js`) y generador de código para el widget nativo de iOS vía la app **Scriptable**.
- **Privacidad total (`localStorage`):** Todos los gastos, topes consumidos y ediciones de promociones/supermercados se guardan exclusivamente de forma local en el dispositivo del usuario (`localStorage`). Nada se envía a servidores externos ni se publica en el repositorio.
- **Reinicio automático de topes (`checkAndAutoResetCaps`):**
  - Las promociones con período `Mensual` se reinician a `$0` automáticamente al cambiar de mes.
  - Las promociones con período `Semanal` se reinician a `$0` automáticamente cada lunes.
  - Las promociones con período `Por Día / Transacción` se reinician a `$0` cada día.
- **Catálogos editables:**
  - Supermercados iniciales separados: `Coto`, `Carrefour`, `Jumbo`, `Disco`, `Vea`, `Día` (cada uno con sus propios días de promoción).
  - Bancos / Billeteras iniciales: `MODO (Santander)`, `Santander Sorpresa`, `Cuenta DNI`, `Mercado Pago`, `Comunidad / Fidelidad`.
  - El usuario puede agregar, renombrar o eliminar tanto supermercados como bancos desde la interfaz (`🏪`).

## Estructura del Proyecto
- `index.html`: Interfaz principal (Pestañas: Promos, Calculadora de Compra Ideal, Guía Mi iPhone + Modales de ABM).
- `styles.css`: Estilos en modo oscuro estilo iOS con soporte para `safe-area-inset` de iPhone.
- `app.js`: Lógica de estado, persistencia en `localStorage` (`superpromos_data_v2`, `superpromos_catalogs_v2`, `superpromos_reset_tracker_v1`), calculadora y generador de widget Scriptable.
- `manifest.json` y `sw.js`: Configuración PWA y caché offline. When modifying assets, bump `CACHE_NAME` in `sw.js`.
- `icons/icon.svg`: Ícono vectorial de la aplicación.

## Desarrollo Local y Despliegue
- **Servidor local:** `python3 -m http.server 8090`
- **Repositorio remoto:** `git@github.com:diegoldev/promos-bancarias.git` (rama `main`)
