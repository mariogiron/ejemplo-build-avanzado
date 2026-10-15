# Angular Avanzado · Módulo 7 · Build y despliegue desde cero

Una aplicación pequeña, el **Recetario**, que empieza recién salida de `ng new`. Sobre ella se mide el build de producción, se preparan entornos, se ponen budgets, se analiza qué hay dentro de cada fichero y se sirve el resultado como lo haría un servidor de verdad.

## Órdenes

```
npm start                 # desarrollo, con el aviso DESARROLLO en la cabecera
npm run build             # producción
npm run build:pre         # preproducción: production + preproduccion
npm run analizar          # build con mapas y stats.json, y el peso por paquete
npm run analizar:mapa     # source-map-explorer sobre el último build de análisis
npm run servir            # build de producción y servidor local en http://localhost:8080
```

## Etiquetas

`git checkout <etiqueta>` deja el código en ese paso. `main` es el final. Después de cambiar de etiqueta, `npm install`.

| Etiqueta               | Paso                                                                |
| ---------------------- | ------------------------------------------------------------------- |
| `paso-0-ng-new`        | Lo que genera `ng new`, sin tocar                                   |
| `paso-1-partida`       | Inicio, Recetas, Detalle y Acerca de; tres rutas en diferido        |
| `paso-2-entornos`      | `ng generate environments` y el contrato `Entorno`                  |
| `paso-3-preproduccion` | La configuración `preproduccion`, que se combina con `production`   |
| `paso-4-budgets`       | Budgets a medida                                                    |
| `paso-5-analisis`      | Configuración `analisis`, `stats.json`, peso por paquete y mapas    |
| `paso-6-lodash`        | Las novedades se ordenan con lodash: **el build no pasa**           |
| `paso-7-sin-lodash`    | Ordenadas sin librería                                              |
| `paso-8-servidor`      | `despliegue/servidor.mjs`: rutas, caché, compresión y 404 de verdad |

Ejercicios, que salen de `paso-8-servidor`:

| Etiqueta                    | Qué es                                                 |
| --------------------------- | ------------------------------------------------------ |
| `ejercicio-1-mapas-ocultos` | Solución del ejercicio 1: mapas sin `sourceMappingURL` |
| `ejercicio-2-problema`      | El punto de partida del ejercicio 2: el build no pasa  |
| `ejercicio-2-solucion`      | Su solución                                            |
