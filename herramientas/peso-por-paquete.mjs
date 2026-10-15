// Lee dist/recetario/stats.json (el «metafile» de esbuild) y suma lo que cada paquete
// aporta al build, separando la carga inicial de lo que se descarga en diferido.
// Uso: node herramientas/peso-por-paquete.mjs   (después de npm run analizar)
import { readFileSync } from 'node:fs';

const { outputs } = JSON.parse(readFileSync('dist/recetario/stats.json', 'utf8'));

// 1. Qué ficheros son carga inicial: main y todo lo que importa de forma estática, en cadena
const inicial = new Set();
const pendientes = Object.keys(outputs).filter((f) => outputs[f].entryPoint?.endsWith('main.ts'));
while (pendientes.length) {
  const fichero = pendientes.pop();
  if (inicial.has(fichero)) continue;
  inicial.add(fichero);
  for (const { path, kind } of outputs[fichero].imports) {
    if (kind === 'import-statement') pendientes.push(path);
  }
}

// 2. De qué paquete viene cada fichero de entrada: node_modules/@angular/core/… → @angular/core
function paquete(entrada) {
  const partes = entrada.split('node_modules/');
  if (partes.length === 1) return '(vuestro código)';
  const [primero, segundo] = partes.at(-1).split('/');
  return primero.startsWith('@') ? `${primero}/${segundo}` : primero;
}

// 3. Sumar los bytes que cada entrada deja en cada salida
const pesos = new Map();
for (const [fichero, salida] of Object.entries(outputs)) {
  if (!fichero.endsWith('.js')) continue;
  const columna = inicial.has(fichero) ? 'inicial' : 'diferido';
  for (const [entrada, { bytesInOutput }] of Object.entries(salida.inputs)) {
    const fila = pesos.get(paquete(entrada)) ?? { inicial: 0, diferido: 0 };
    fila[columna] += bytesInOutput;
    pesos.set(paquete(entrada), fila);
  }
}

const kB = (bytes) => (bytes / 1000).toFixed(2).padStart(9);
console.log('Paquete                         Inicial (kB)  Diferido (kB)');
for (const [nombre, { inicial: i, diferido: d }] of [...pesos].sort(
  (a, b) => b[1].inicial - a[1].inicial,
)) {
  console.log(`${nombre.padEnd(32)}${kB(i)}     ${kB(d)}`);
}
