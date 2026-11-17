# Contexto del Agente (AGENTS.md)

Este repositorio contiene **SuperPromos**, una PWA para iPhone de control de promociones bancarias y topes de supermercados en Argentina.

## Reglas clave al modificar este proyecto
1. **Privacidad Local:** Nunca guardes datos de gastos o topes del usuario en archivos estáticos del repositorio ni en servicios externos; todo dato personal debe persistir únicamente en `localStorage` del navegador del iPhone.
2. **Cencosud separado:** Mantené siempre separados `Jumbo`, `Disco` y `Vea` ya que tienen promociones en diferentes días de la semana.
3. **Cache Busting PWA:** Siempre que modifiques `index.html`, `app.js` o `styles.css`, incrementá la versión de `CACHE_NAME` en `sw.js` (ej. de `super-promos-v3` a `super-promos-v4`) para que el iPhone del usuario descargue los cambios inmediatamente.
4. **Sin dependencias de compilación:** El proyecto es Vanilla HTML/CSS/JS puro para poder servirse directamente desde GitHub Pages sin pasos de build.
