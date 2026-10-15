// Sirve el build de producción en el portátil haciendo lo que tiene que hacer el servidor de verdad.
// No es para producción: es para ver esas cuatro cosas en las herramientas del navegador.
// Arranca con: node despliegue/servidor.mjs   (después de npm run build)
import { existsSync, readFileSync, statSync } from 'node:fs';
import http from 'node:http';
import { extname, join } from 'node:path';
import { gzipSync } from 'node:zlib';

const CARPETA = 'dist/recetario/browser';
const PUERTO = Number(process.env.PUERTO ?? 8080);

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};
const COMPRIMIBLES = ['.html', '.js', '.css', '.json', '.txt'];

/** Los ficheros con hash en el nombre: main-VHGCCN33.js, chunk-KQXIV2HL.js, styles-NKBZYEAW.css */
const CON_HASH = /-[A-Z0-9]{8}\.(js|css)$/;

if (!existsSync(join(CARPETA, 'index.html'))) {
  console.error(`No hay build en ${CARPETA}. Ejecuta antes: npm run build`);
  process.exit(1);
}

http
  .createServer((peticion, respuesta) => {
    const ruta = decodeURIComponent(new URL(peticion.url, 'http://localhost').pathname);
    let fichero = join(CARPETA, ruta);

    if (!existsSync(fichero) || statSync(fichero).isDirectory()) {
      // 1. Un fichero que no existe (tiene extensión): 404 de verdad, no index.html
      if (extname(ruta) !== '') {
        console.log(`[servidor] ${ruta} → 404`);
        respuesta.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        respuesta.end('No existe');
        return;
      }
      // 2. Una ruta de Angular (/recetas/3): index.html, y el router decide
      fichero = join(CARPETA, 'index.html');
    }

    const extension = extname(fichero);
    const cabeceras = {
      'content-type': TIPOS[extension] ?? 'application/octet-stream',
      // 3. Caché: un año para lo que lleva hash; para lo demás, preguntar siempre antes de usar
      'cache-control': CON_HASH.test(fichero) ? 'public, max-age=31536000, immutable' : 'no-cache',
    };
    let cuerpo = readFileSync(fichero);

    // 4. Compresión, si el navegador la acepta
    if (
      COMPRIMIBLES.includes(extension) &&
      /gzip/.test(peticion.headers['accept-encoding'] ?? '')
    ) {
      cuerpo = gzipSync(cuerpo);
      cabeceras['content-encoding'] = 'gzip';
    }
    cabeceras['content-length'] = cuerpo.length;
    console.log(
      `[servidor] ${ruta} → ${fichero.slice(CARPETA.length + 1)} (${cuerpo.length} bytes)`,
    );
    respuesta.writeHead(200, cabeceras);
    respuesta.end(cuerpo);
  })
  .listen(PUERTO, () => console.log(`Build de producción en http://localhost:${PUERTO}`));
